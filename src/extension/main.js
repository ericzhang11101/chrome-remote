import YTHandler from './sites/youtube'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { io } = require("socket.io-client");
import { toggleVideo, pressKey, toggleFullscreen, scrollToTop} from './utils/siteUtils'
const BASE_URL = "ws://localhost:3000"

const state = {
    key: undefined,
    isLoaded: false,
    socket: io(BASE_URL)
}

handleKeyLoading()
const ytHandler = new YTHandler();
handleSubpage()

// periodically check if key, once key is found, update state.
async function handleKeyLoading(){
    console.log('handleKeyLoading')
    return new Promise((res) => {

        const interval = setInterval(() => {
            console.log('start of key interval')
            if (state.key){
                // const socketPath = BASE_URL + '/' + state.key
                // console.log(socketPath)
                
                clearInterval(interval)
                handleSocket(state.socket)
                res(true)
            }
        }, 1000);
    });
}
  
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

function handleSocket(socket) {
    const socketKey = "control-" + state.key
    console.log('listening for ' + socketKey)
    socket.on(socketKey, (message) => {
        const {socket} = state;
        console.log(message)
        console.log('click')
        console.log(ytHandler.GridHandler)
        console.log('socket: ')
        console.log(state.socketsocket)
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
}


async function handleLoading(callback){
    const {socket} = state
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

// WORKS
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      console.log(request)

      if (request.key){
        state.key = request.key
        sendResponse({success: true});
        console.log('new key: ' + state.key)
      }
    }
  );
