import React from 'react';
import {Signal, computed} from "@preact/signals-react"

type ImgInputProps = {
    destination:Signal<File[]>
    count:Signal<number>
}
const ImgInput:React.FC<ImgInputProps> = ({destination, count}) => {
  return (
    <>
    {/* Duplicate input based on count  */}
      {computed(()=>{
        const element = []
        for(let i = 0; i < count.value; i++) {
          element.push(<input
          key={i}
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              destination.value = ([...destination.value, e.target.files[0]]);
              console.log(destination.value)
            } else {
              console.warn("No file selected");
            }
          }}
          />)
        }
        return element;
      })}
    </>
  )
}
export default ImgInput