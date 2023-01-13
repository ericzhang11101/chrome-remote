import React, {useState, useEffect} from 'react';
import QrContainer from './components/QrContainer';
import Signup from './components/Signup';

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [deviceName, setDeviceName] = useState<string>('name') // ''
  const [shouldShowQrCode, setShouldShowQrCode] = useState<boolean>(false)
  const [deviceKey, setDeviceKey] = useState<string>("")
  const [requireSignup, setRequireSignup] = useState<boolean>(true) // false

  useEffect(() => {
    const loadCookies = async () => {
      const key = await getKeyFromCookies()
      if (key){
        setDeviceKey(key);
      }
      else {
        // generate key,  show qr code, add device name, promt user to scan
        setRequireSignup(true);
      }
    }

    loadCookies();
  }, []);

  useEffect(() => {

  }, [deviceName])

  async function getKeyFromCookies(){
    // TODO: make into hook

    // @ts-ignore
    if (chrome){
      // @ts-ignore
      console.log(chrome)
      // @ts-ignore
      console.log(chrome.cookies)
      // @ts-ignore
      const cookies = await chrome.cookies.getAll({ domain: {} });
      console.log('cookies: '  + cookies);

    }

    return "fake-key-123";
  }

  function updateDeviceKey(newKey: string){
    // write to cookies
    setDeviceKey(newKey)
    if (requireSignup){
      setRequireSignup(false)
    }
  }

  return (
    <div className="App">
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
