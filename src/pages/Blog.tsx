import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser"
import { handleGetDoc, handleGetFileURL, handleReadAllFiles } from '../firebase/handler';
import { BlogData, ImgDownData } from '../types/BlogData';
import {signal, computed, batch} from "@preact/signals-react"

const fetchedData = signal<BlogData>({title:"", content:"",description:"", date:""})
const fetchedImgs = signal<ImgDownData[]>([])

const previewContent = computed(()=>{
  const path = `images/${fetchedData.value.title}`
  
  const replaced = fetchedData.value.content.replace(/{{image(\d+)}}/g, (match, id) => {
    const url = fetchedImgs.value.find((elem) => elem.id == id)?.url
    return `<img src="${url}" />`;
  });
  return parse(replaced)
})


const Blog:React.FC = () => {
  const { blogURL } = useParams()
  
  useEffect(()=>{
    handleGetDoc("blogs", blogURL as string).then((result)=>{
      fetchedData.value = (result as BlogData)
    })
    handleReadAllFiles(`images/${blogURL}`).then((result)=>{
      fetchedImgs.value = result
    })
  }, [])
  

    return(
    <>
      <h1>{blogURL}</h1>
      {previewContent}
    </>
  )
};

export default Blog;