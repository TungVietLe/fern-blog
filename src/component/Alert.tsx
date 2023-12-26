import React from 'react';
import { Alert, Button, Space } from 'antd';
import { Signal, signal, computed } from '@preact/signals-core';

export const alert = signal<"success"|"info"|"error"|"warning"|null>("success")
const component = computed(()=>{
    if (alert.value != null) {
        return(
        <>
            {
                <Space direction="horizontal" style={{ width: '100%' , display:"flex"}}>
                    <Alert message={alert} type={alert.value!} />
                    <Button danger type="dashed" onClick={()=>alert.value=null}>x</Button>
                </Space>
            }
        </>
        )
    }
    else return <></>
})

const App: React.FC = () => {
    return<>{component}</>
}

export default App;
