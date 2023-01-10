import React, {useState, useEffect} from 'react';
import QrContainer from './components/QrContainer';
import Signup from './components/Signup';
import dotenv from 'dotenv'

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [deviceName, setDeviceName] = useState<string>('') // ''
  const [shouldShowQrCode, setShouldShowQrCode] = useState<boolean>(false) //toggle qr code
  const [deviceKey, setDeviceKey] = useState<string>("")
  const url = "http://localhost:3000"

  const [requireSignup, setRequireSignup] = useState<boolean>(false) // false

  useEffect(() => {
    const loadCookies = async () => {
      const key = await getKeyFromCookies()
      if (key){
        console.log("KEY")
        console.log(key)

        setDeviceKey(key as string); // promise -> string
        setIsConnected(true) // todo: maybe change to when remote connects??

        const data = await fetch("http://localhost:3000/getNickname", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: key
          }) 
        })
          .then((response) => response.json())

        console.log('device name: ')
        console.log(data)

        if (data.deviceName){
          setDeviceName(data.deviceName)
        } else {
          // if no deviceName
          setRequireSignup(true);
        }
      }
      else {
        console.log("NO KEY")
        // generate key,  show qr code, add device name, promt user to scan
        setRequireSignup(true);
      }
    }

    loadCookies();
  }, []);

  async function getKeyFromCookies(){
    const domain = "http://www.youtube.com"
    const name = "id"

    const cookie = await new Promise((resolve, reject) => {

      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        resolve(undefined)
        // resolve("TESTKEY123") 
      } else {
        // production code
        chrome.cookies.get({
          url: domain,
          name
        },
        function (cookie) {
            if (cookie) {
                console.log(cookie.value)
                resolve(cookie.value)
            }
            else {
                console.log('Can\'t get cookie! Check the name!')
                reject();
            }
        })
      }
        
    });

    console.log("key: " + cookie)
    // get name from url

    return cookie
  }

  async function setCookie(value: string){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
    } else {
      chrome.cookies.set({
        "name": "id",
        "url": "https://www.youtube.com/",
        "value": value
      });
    }
  }

  async function updateDeviceKey(newKey: string){
    setDeviceKey(newKey)
    setCookie(newKey)
    setIsConnected(true);
    // update background.js??

    chrome.runtime.sendMessage({
      type: "deviceKey",
      value: newKey
    })

  }

  async function setDeviceValues(newName: string, newKey: string){
    updateDeviceKey(newKey)
    setDeviceName(newName)
    // hit api with new key, name

    const success = await fetch("http://localhost:3000/setNickname", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        key: newKey
      }) 
    })
      .then((response) => response.json())
      .then((data) => data.success)
  
    if (success){
      if (requireSignup){
        setRequireSignup(false)
      }
    }
    else {
      console.error('failed to create')
      updateDeviceKey("")
      setDeviceName("")
      setIsConnected(false)
    }
  }

  return (
    <div className="app">
      <h1>{isConnected ? 'Connected' : 'Disconnected'}</h1>
      <h3>{deviceName}</h3>
      {
        requireSignup
        ? 
        <Signup 
          setDeviceValues={setDeviceValues}
        />
        :
        <QrContainer 
          deviceKey={deviceKey}
          deviceName={deviceName}
        />
      }
      <button onClick={(e) => updateDeviceKey("TESTKEY123")}>
        test
      </button>
    </div>
  );
}

export default App;
