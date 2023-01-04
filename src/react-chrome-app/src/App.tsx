import React, {useState, useEffect} from 'react';
import QrContainer from './components/QrContainer';
import Signup from './components/Signup';

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [deviceName, setDeviceName] = useState<string>('') // ''
  const [shouldShowQrCode, setShouldShowQrCode] = useState<boolean>(false) //toggle qr code
  const [deviceKey, setDeviceKey] = useState<string>("")

  const [requireSignup, setRequireSignup] = useState<boolean>(false) // false

  useEffect(() => {
    const loadCookies = async () => {
      const key = await getKeyFromCookies()
      if (key){
        console.log("KEY")
        console.log(key)

        setDeviceKey(key as string); // promise -> string
        setIsConnected(true) // todo: maybe change to when remote connects??
        setDeviceName('device name') // todo: get name from backend
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

    const cookie = new Promise((resolve, reject) => {
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
    });

    return cookie
  }

  async function setCookie(value: string){
    chrome.cookies.set({
      "name": "id",
      "url": "https://www.youtube.com/",
      "value": value
    });
  }

  function updateDeviceKey(newKey: string){
    setDeviceKey(newKey)
    setCookie(newKey)
    setIsConnected(true);
    // update background.js??
    chrome.runtime.sendMessage({
      type: "deviceKey",
      value: newKey
    })
    
    if (requireSignup){
      setRequireSignup(false)
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
          setDeviceName={setDeviceName}
          setDeviceKey={updateDeviceKey}
        />
        :
        <QrContainer 
          deviceKey={deviceKey}
          deviceName={deviceName}
        />
      }
    </div>
  );
}

export default App;
