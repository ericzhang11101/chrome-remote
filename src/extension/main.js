import YTHandler from './sites/youtube'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { io } = require("socket.io-client");
const socket = io('ws://localhost:3000');

import { toggleVideo, pressKey, toggleFullscreen, scrollToTop} from './utils/siteUtils'

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
            await ytHandler.loadButtons3(); 
            break;
        default: 
            console.log('default')
            await ytHandler.loadButtons1();
    }
}

socket.on("control", (message) => {
    console.log(message)
    console.log('grid handler')
    console.log(ytHandler.GridHandler)
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
            // eslint-disable-next-line no-case-declarations
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
        case 'toggleSidebar':
            console.log(ytHandler.toggleSidebar)
            handleLoading(ytHandler.toggleSidebar)
            break;
        case 'scrollToTop':
            scrollToTop();
            ytHandler.GridHandler.resetGrid();
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

// document.addEventListener("click", function() {
//     console.log('user click, resetting all')
//     ytHandler.GridHandler.resetGrid();
//     handleLoading(handleSubpage)

//     // eslint-disable-next-line no-undef
//     chrome.runtime.sendMessage(
//         "foo",
//         function (response) {
//             console.log(response);
//         }
//     );

// }, false);

console.log('chrome');
console.log(chrome)
console.log(chrome.runtime)


chrome.runtime.onMessage((message) => {
    console.log('message from background');
    console.log(message);
    if (message?.type === 'deviceKey'){
        console.log('update key!!')
        console.log(message.value)
    }
})