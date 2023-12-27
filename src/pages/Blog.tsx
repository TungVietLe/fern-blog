import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser"
import { handleGetDoc, handleGetFileURL, handleReadAllFiles } from '../firebase/handler';
import { BlogData, ImgDownData } from '../types/BlogData';
import {signal, computed, batch} from "@preact/signals-react"

const data = signal<BlogData>({title:"", content:""})
const fetchedImgs = signal<ImgDownData[]>([])

const previewContent = computed(()=>{
  const path = `images/${data.value.title}`
  
  const replaced = data.value.content.replace(/{{image(\d+)}}/g, (match, id) => {
    const url = fetchedImgs.value.find((elem) => elem.id == id)?.url
    return `<img src="${url}" />`;
  });
  return parse(replaced)
})


const Blog:React.FC = () => {
  const { blogURL } = useParams()
  
  useEffect(()=>{
    handleGetDoc("blogs", blogURL as string).then((result)=>{
      data.value = (result as BlogData)
    })
    handleReadAllFiles(`images/${blogURL}`).then((result)=>{
      fetchedImgs.value = result
    })
  }, [])
  

    return(
    <>
      {previewContent}
    </>
  )
};

export default Blog;