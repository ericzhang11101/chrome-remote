import React, {useEffect} from 'react'
// @ts-ignore
import QRCode from 'qrcode'
 

interface PropTypes {
    deviceName: string,
    deviceKey: string
}

export default function QrContainer({deviceName, deviceKey}: PropTypes) {

    useEffect(() => {
        // TODO: upgrade to microservice
        const qrUrl = "base-url" + deviceName + "device-key" + deviceKey
        var canvas = document.getElementById('canvas')

        QRCode.toCanvas(canvas, qrUrl)
    }, []);

    return (
        <div className="qr-container">
            <canvas id="canvas"></canvas>
        </div>
    )
}
