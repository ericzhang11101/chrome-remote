import ytHandler from './sites/youtube'

console.log('i think webpack is broken')





const sidebar = new Promise((res, rej) => {
    const sidebar = ytHandler.loadSidebarButtons();
    res(sidebar)
})

console.log(sidebar)

// console.log(sidebar)
// console.log(sidebar.length);
// sidebar[2].click()


// interval for api calls
    // handling api call
    // call the objects click / hover, if fail, object refreshes 