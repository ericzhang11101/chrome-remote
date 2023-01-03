import React, {useState} from 'react'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Signup({setDeviceName, setDeviceKey}: any) {
    const [deviceNameText, setDeviceNameText] = useState<string>('')
    function handleTextChange(e: any){
        setDeviceNameText(e.target.value);
    }

    function handleSubmit(e: any){
        e.preventDefault()
        console.log('disabled?')
        console.log(deviceNameText.length > 0)
        const uuid = uuidv4();

        setDeviceName(deviceNameText)
        setDeviceKey(uuid)
    }

    return (
        <div className="qr-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formDeviceName">
                    <Form.Control 
                        type="deviceName" 
                        placeholder="Device Name" 
                        onChange={handleTextChange} 
                        value={deviceNameText}
                    />
                </Form.Group>
                <Button type='submit' disabled={deviceNameText.length === 0} >
                    Submit
                </Button>
            </Form>
            
        </div>
    )
}
