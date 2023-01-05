chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
        console.log('wtf')
        sendMessage()
        sendResponse("bar");
        
    }
);

function sendMessage(){
    console.log('sending pt 1')
    const message = {
        type: 'message'
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log('sending message')
        chrome.tabs.sendMessage(tabs[0].id, message, () => {});  
    });
}