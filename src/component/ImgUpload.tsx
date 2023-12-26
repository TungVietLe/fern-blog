import React, {useState} from 'react';
import { Button, Upload } from 'antd';


const App: React.FC = () => {
  const [fileList, setFileList]= useState<File[]>([])
  return (
    <>
    {/* <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      listType="picture"
      onChange={(e) => setFileList({...fileList, e})}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload> */}
    <input
    type="file"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setFileList([...fileList, e.target.files[0]]);
        console.log(fileList)
      } else {
        // Handle the case where no file is selected
        console.warn("No file selected");
      }
    }}
    />
    <Button onClick={()=>{console.log(fileList)}}>Test</Button>
    {
      fileList.map((f,index)=>{
        return (
          <div>
            {<img src={URL.createObjectURL(f)} key={index} />}
          </div>
        );
      })
    }
  </>
  )
}

export default App;
