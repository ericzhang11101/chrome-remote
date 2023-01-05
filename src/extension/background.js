let key

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
        sendMessage()
        if (request.type === "deviceKey"){
            key = request.value;
            console.log('got key: + key')
        }
        else if (request.type = "keyRequest"){
            sendResponse()
        }
    }
);

async function sendMessage(){
    console.log('sending pt 1')
    const message = {
        type: 'message'
    }

    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs){
        console.log('sending message')
        // console.log(tabs)
        // chrome.tabs.sendMessage(tabs[0].id, message);  
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        console.log('tab')
        console.log(tab)
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        console.log(response);
    });
}

