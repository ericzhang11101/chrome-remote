let key

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
        sendMessage()
        if (request.type === "deviceKey"){
            key = request.value;
            console.log('got key: ' + key )
        }
        else if (request.type = "keyRequest"){
            sendResponse()
        }
    }
);

async function sendMessage(){
    let count = 0 

    console.log('send message')

    const messageInterval = setInterval(() => {
        console.log('sending pt ' + count)
        count ++

        const message = {
            type: 'message',
            key
        }
    
        // todo: keep sending message until response
        chrome.tabs.query({active: true, currentWindow: true}, async function(tabs){
            console.log('sending message')
            // console.log(tabs)
            // chrome.tabs.sendMessage(tabs[0].id, message);  
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});

            if (tab.id !== undefined){
                console.log('tab')
                console.log(tab)
                await chrome.tabs.sendMessage(tab.id, message);

                clearInterval(messageInterval)
            }
            
        });

    }, 1000)

}

