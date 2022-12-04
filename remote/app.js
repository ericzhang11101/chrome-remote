const socket = io('ws://localhost:3000');

socket.on("message", (message) => {
    console.log(message)
})

function moveUp(){
    socket.emit('control', {
        type: 'control',
        movement: 'up'
    })
}

function moveDown(){
    socket.emit('control', {
        type: 'control',
        movement: 'down'
    })
}

function moveLeft(){
    socket.emit('control', {
        type: 'control',
        movement: 'left'
    })
}

function moveRight(){
    console.log('right')
    socket.emit('control', {
        type: 'control',
        movement: 'right'
    })
}

function moveClick(){
    console.log('click')
    socket.emit('control', {
        type: 'control',
        movement: 'click'
    })
}