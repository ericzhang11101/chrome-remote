import YTHandler from './sites/youtube'
const { io } = require("socket.io-client");
const socket = io('ws://localhost:3000');

import { toggleVideo, pressKey, toggleFullscreen } from './utils/siteUtils'

const ytHandler = new YTHandler();
handleSubpage()

async function handleSubpage(){
    const regex = /youtube.com\/(watch|feed|shorts|@|)/

    const url = window.location.toString();
    const match = url.match(regex)[1]
    if (!match){
        // handle error
    }
    console.log('match: ')
    console.log(match)
    switch (match){
        case "watch": 
            console.log('watch')
            await ytHandler.loadButtons2();
            break;
        case "feed":
            console.log('feed')
            await ytHandler.loadButtons1(); 
            break;
        case "shorts":
            console.log('shorts')

            break;
        case "@":
            console.log('channel')

            break;
        default: 
            console.log('default')
            await ytHandler.loadButtons1();


    }
}

socket.on("control", (message) => {
    console.log(message)
    switch (message.control) {
        case 'up':
            ytHandler.GridHandler.moveUp();
            break;
        case 'down': 
            ytHandler.GridHandler.moveDown();
            break;
        case 'left': 
            ytHandler.GridHandler.moveLeft();
            break;
        case 'right': 
            ytHandler.GridHandler.moveRight();
            break;
        case 'click': 
            ytHandler.GridHandler.click();
            handleLoading(handleSubpage)
            break;
        case 'togglePlay':
            const videoState = toggleVideo();
            socket.emit("control-response", {
                type: "video-status",
                status: videoState
            })
            break;
        case 'toggleFullscreen': 
            toggleFullscreen();
            break;
        case 'toggleMute': 
            pressKey('m');
            break;
        default: 
            socket.emit("control-response", {
                type: "error",
                error: "unknown control " + message.movement
            })
    } 
})

async function handleLoading(callback){
    socket.emit("load-status", {
        isLoaded: false
    })
    await callback()

    socket.emit("load-status", {
        isLoaded: true
    })
}

