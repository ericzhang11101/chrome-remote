import React, {useEffect} from 'react'
import QRCode from 'qrcode'


interface PropTypes {
    deviceName: string,
    deviceKey: string
}

export default function QrContainer({deviceName, deviceKey}: PropTypes) {

    useEffect(() => {
        const qrUrl = "base-url" + deviceName + "device-key"
        var canvas = document.getElementById('canvas')

        QRCode.toCanvas(canvas, qrUrl)
    }, []);
    return (
        <div className="qr-container">
            <canvas id="canvas"></canvas>
        </div>
    )
}
