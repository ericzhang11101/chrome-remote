const socket = io('ws://localhost:3000');

socket.on("message", (message) => {
    console.log(message)
})

socket.on("load-status", (message) => {
    if (message.isLoaded){
        disableButtons()
    }
    else{
        enableButtons()
    }
})

function emit(message){
    console.log('emit')
    socket.emit('control', {
        type: 'control',
        control: message
    })
}

function disableButtons(){
    console.log('unloading')
    document.querySelectorAll('button').forEach((button) => {
        console.log('button')
        button.disabled = true;
    })
}

function enableButtons(){
    document.querySelectorAll('button').forEach((button) => {
        button.disabled = false;
    })
}

// unloadButtons()