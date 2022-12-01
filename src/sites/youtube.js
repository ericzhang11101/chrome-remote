import Button from '../utils/Button.ts'
import ButtonGrid from "../utils/ButtonGrid";
import GridContainer from '../utils/GridContainer';
import {GridEnum} from '../utils/Enums';
import '../styles/style.css'

// let GridHandler = 'temp';

// // function _hover(button){
// //     const [button] = button
// //     button.classList.add("select-class");
// // } 

// export const ytHandler = {
//     loadSidebarButtons: loadSidebarButtons,
//     loadButtons,
//     GridHandler
// }

export default class ytHandler{
    GridHandler = 'temp';

    constructor(){
        this.loadButtons();
    }

    loadButtons = async () => {
        const sidebar = await loadSidebarButtons()
        const main = await loadMainButtons()
    
        console.log(GridEnum)
        console.log('main rows: ' + main.length)
        console.log('hovering')
        // console.log(main[4][2])
        console.log(sidebar)
        // main[4][2].button.focus()
        // sidebar[2].button.focus()
        // sidebar[3].button.focus()
    
        const sidebarGrid = new ButtonGrid(sidebar, GridEnum.Col);
        const mainGrid = new ButtonGrid(main);
    
        this.GridHandler = new GridContainer(
            [
                [sidebarGrid, mainGrid]
            ]
        )
    
        // for (let i = 0; i < 5; i++){
        //     console.log('start')
        //     setTimeout(() => {
        //         GridHandler.moveDown()
        //         console.log('end')
        //     }, i * 3000)
        // }
    
        // for (let i = 0; i < 5; i++){
        //     console.log('start')
        //     setTimeout(() => {
        //         GridHandler.moveUp()
        //         console.log('end')
        //     }, i * 3000 + 15000)
        // }
    }

    loadSidebarButtons = async () => {
        return new Promise((res) => {
            let sidebar, temp;
    
            // interval for loading (put in separate object later), some state value for loading 
            const sidebarInterval = setInterval(() => {
                sidebar = document.querySelectorAll('ytd-guide-entry-renderer')
    
                if (!sidebar){
                    console.log('waiting for sidebar');
                } else {
                    // delete loading interval
                    console.log('sidebar found ' + sidebar.length)
                    clearInterval(sidebarInterval);
                    temp = [...sidebar].map((button) => new Button(button));
                    res(temp)
                }
            }, 1000)
        })
    }
    
    loadMainButtons = async () => {
        return new Promise((res) => {
            let mainButtons = [];
            let buttonRows;
    
            // interval for loading (put in separate object later), some state value for loading 
            const mainButtonInterval = setInterval(() => {
                buttonRows = document.querySelectorAll('ytd-rich-grid-row')
    
                if (!buttonRows){
                    console.log('waiting for mainButtons');
                } else {
                    console.log('mainButtons found')
                    buttonRows.forEach((row) => {
                        const temp = row.querySelectorAll('ytd-rich-item-renderer');
                        console.log(typeof temp)
                        const temp2 = [...temp].map((selector) => {
                            return new Button(selector);
                        })
                        mainButtons.push(temp2)
                    });
    
                    // put buttons into rows 
                    clearInterval(mainButtonInterval);
                    res(mainButtons);
                }
            }, 1000)
        })
    }
    
}