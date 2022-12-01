import ytHandler from './sites/youtube'

const GridHandler = ytHandler.GridHandler;
console.log('grid handler')
console.log(GridHandler);
await ytHandler.loadButtons();
console.log('new gridhandler')
console.log(GridHandler)

function loadSitePage() {
    // call site page    
}

function loadAPI () {

}

// function resolveAfter2Seconds(x) {
// return new Promise((resolve) => {
//     setTimeout(() => {
//     resolve(x);
//     }, 2000);
// });
// }
  
// async function f1() {
// const x = await resolveAfter2Seconds(10);
// console.log(x); // 10
// }

// f1();
// console.log('after')

// interval for api calls
    // handling api call
    // call the objects click / hover, if fail, object refreshes 