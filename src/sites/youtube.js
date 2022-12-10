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

    getSidebarButtons = async () => {
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
            }, 500)
        })
    }
    
    getMainVideos = async () => {
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
            }, 500)
        })
    }

    getSidebarVideos = async () => {
        return new Promise((res) => {
            let sidebar, temp;
    
            // interval for loading (put in separate object later), some state value for loading 
            const sidebarInterval = setInterval(() => {
                sidebar = document.querySelectorAll('#contents ytd-compact-video-renderer')
    
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
            }, 500)
        })
    }

    loadButtons1 = async () => {
        const sidebarGrid = new ButtonGrid(this.getSidebarButtons, GridEnum.Col, 0);
        await sidebarGrid.initialize()
        const mainGrid = new ButtonGrid(this.getMainVideos, GridEnum.Grid, 150);
        await mainGrid.initialize()

        this.GridHandler = new GridContainer(
            [
                [sidebarGrid, mainGrid]
            ]
        )
    }

    loadButtons2 = async () => {
        console.log("BUTTON")
        console.log("BUTTON")
        console.log("BUTTON")
        console.log("BUTTON")
        console.log("BUTTON")

        const sidebarGrid = new ButtonGrid(this.getSidebarVideos, GridEnum.Col, 70);
        await sidebarGrid.initialize()

        this.GridHandler = new GridContainer(
            [
                [sidebarGrid]
            ]
        )
    }

    playNextVideo = () => {
        document.querySelector('.ytp-next-button').click();
    }
}