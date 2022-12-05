import Button from '../utils/Button.ts'
import ButtonGrid from "../utils/ButtonGrid";
import GridContainer from '../utils/GridContainer';
import {GridEnum} from '../utils/Enums';
import {checkVisible} from '../utils/siteUtils'
import '../styles/style.css'

export default class YTHandler{
    GridHandler = 'temp';

    constructor(){
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
                    temp = [...sidebar]
                        .filter((element) => {
                            return checkVisible(element)
                        })
                        .map((button) => new Button(button));
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
                buttonRows = document.querySelectorAll('ytd-rich-grid-row, ytd-rich-section-renderer')
    
                if (!buttonRows){
                    console.log('waiting for mainButtons');
                } else {
                    console.log('mainButtons found')
                    buttonRows.forEach((row) => {
                        const temp = row.querySelectorAll('ytd-rich-item-renderer');
                        const temp2 = [...temp]
                            .filter((element) => {
                                return element.querySelectorAll('ytd-ad-slot-renderer').length == 0
                                // return checkVisible(element)
                            })
                            .map((selector) => {
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

    buttonsOnPage = [this.loadSidebarButtons, this.loadMainButtons]

    loadButtons = async () => {
        // const sidebar = await this.loadSidebarButtons()
        // const main = await this.loadMainButtons()
        const sidebarGrid = new ButtonGrid(this.loadSidebarButtons, GridEnum.Col);
        await sidebarGrid.initialize()
        const mainGrid = new ButtonGrid(this.loadMainButtons, GridEnum.Grid);
        await mainGrid.initialize()

        this.GridHandler = new GridContainer(
            [
                [sidebarGrid, mainGrid]
            ]
        )

        // [Y][X]
    
    }
    
}