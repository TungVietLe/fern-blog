import React from 'react';
import {Input} from "antd";
import {Signal, signal, useSignal, computed} from "@preact/signals-react"
import { ImgUpData } from '../types/BlogData';
const {TextArea} = Input

type ImgInputProps = {
    destination:Signal<ImgUpData[]>
}
const ImgInput:React.FC<ImgInputProps> = ({destination}) => {
    const desireId = signal<string>("")
  return (
    <>
        <input
            type="file"
            onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                const newFile = e.target.files[0]
                const newImgData = {id:newFile.name, file: newFile}
                destination.value = [...destination.value, newImgData];
                desireId.value = newFile.name
                console.log(destination.value)
                } else {
                console.warn("No file selected");
                }
            }}
        />
        {
            // computed since value depend on desireID
            computed(()=>{
                return (
                <>
                    <TextArea
                        value={desireId.value}
                        onChange={(e) => {
                            desireId.value = e.target.value
                            const temp = [...destination.value]
                            temp[temp.length-1].id = desireId.value
                            destination.value = temp
                        }}
                        placeholder="Image ID (number only)"
                        autoSize
                        disabled={destination.value.length == 0}
                    />
                </>)
            })
        }
    </>
  )
}
export default ImgInput