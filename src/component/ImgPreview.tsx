import React, {useState} from 'react';
import {Signal, computed} from "@preact/signals-react"


type ImgPreviewProps = {
    data:Signal<File[]>
}
const ImgPreview:React.FC<ImgPreviewProps> = ({data}) => {
  return (
    <>
      {computed(()=> data.value.map((f,index)=>{
          return <img src={URL.createObjectURL(f)} key={index} />
      })) }
    </>
  )
} 

export default ImgPreview;
