import React, {useState} from 'react';
import { Button, Upload } from 'antd';
import {Signal, signal, computed} from "@preact/signals-react"
import ImgInput from "./ImgInput"
import ImgPreview from './ImgPreview';


const ImgUpload: React.FC = () => {
  const fileList = signal<File[]>([])
  const fileCount = signal<number>(1)
  return (
    <>
    <Button onClick={()=>{fileCount.value++}}>+</Button>
    <Button onClick={()=>{console.log(fileCount)}}>Test</Button>
    <ImgInput destination={fileList} count={fileCount}/>
    <ImgPreview data={fileList}/>
  </>
  )
}

export default ImgUpload;
