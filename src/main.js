import YTHandler from './sites/youtube'
const { io } = require("socket.io-client");
const socket = io('ws://localhost:3000');

console.log(socket);

socket.on("control", (message) => {
    console.log(message)
    switch (message.movement) {
        case 'up':
            ytHandler.GridHandler.moveUp();
            break;
        case 'down': 
            ytHandler.GridHandler.moveDown();
            break;
        case 'left': 
            ytHandler.GridHandler.moveDown();
            break;
        case 'right': 
            ytHandler.GridHandler.moveRight();
            break;
        case 'click': 
            ytHandler.GridHandler.moveDown();
            break;
        default: 
            socket.emit("control-response", {
                type: "error",
                error: "unknown control " + message.movement
            })
    } 
})

const ytHandler = new YTHandler();

await ytHandler.loadButtons();

// app.get('/', (req, res) => {
//     res.send('hello world')
// })

function loadSitePage() {
    // call site page    
}

function loadAPI () {

}
