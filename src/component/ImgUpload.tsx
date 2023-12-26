import React, {useState} from 'react';
import { Button, Upload } from 'antd';
import {Signal, signal, computed} from "@preact/signals-react"
import ImgInput from "./ImgInput"
import ImgPreview from './ImgPreview';
import { ImgUpData } from '../types/BlogData';


const ImgUpload: React.FC = () => {
  const fileList = signal<ImgUpData[]>([])
  return (
    <>
    <Button onClick={()=>{console.log(fileList.value)}}>Test</Button>
    <ImgInput destination={fileList}/>
    <ImgPreview data={fileList}/>
  </>
  )
}

export default ImgUpload;
