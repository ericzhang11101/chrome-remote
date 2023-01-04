'use strict'

import Button from '../utils/Button.ts'
import ButtonGrid from "../utils/ButtonGrid";
import GridContainer from '../utils/GridContainer';
import {GridEnum} from '../utils/Enums';
import {checkVisible} from '../utils/siteUtils'
import '../styles/style.css'
import { scrollToTop } from '../utils/siteUtils'

export default class YTHandler{
    GridHandler = undefined;
    hasSidebar = undefined;
    sidebarHandler = undefined;
    sidebarActive = false;


    constructor(){
        //empty
    }

    getSidebarButtons = async () => {
        return new Promise((res) => {
            let sidebar, temp;
    
            // interval for loading (put in separate object later), some state value for loading 
            const sidebarInterval = setInterval(() => {
                sidebar = document.querySelectorAll('ytd-guide-entry-renderer')
    
                if (!sidebar.length){
                    console.log('waiting for sidebar');
                } else {
                    // delete loading interval
                    console.log(sidebar)
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
    
                if (!buttonRows.length){
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
    
                if (!sidebar.length){
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

    getPaperTabs = async () => {
        return new Promise((res) => {
            let paperTabs, temp;
    
            // interval for loading (put in separate object later), some state value for loading 
            const paperTabsInterval = setInterval(() => {
                paperTabs = document.querySelectorAll('#tabsContent tp-yt-paper-tab')

                if (!paperTabs.length){
                    console.log('waiting for paperTabs');
                } else {
                    // delete loading interval
                    console.log('paperTabs found ' + paperTabs.length)
                    clearInterval(paperTabsInterval);
                    temp = [...paperTabs]
                        .filter((element) => {
                            return checkVisible(element)
                        })
                        .map((button) => new Button(button));
                    temp.pop(); // no search
                    console.log('papertabs ')
                    console.log(temp)
                    res(temp)
                }
            }, 500)
        })
    }

    getChannelButtons = async () => {
        return new Promise((res) => {
            let channelButtons = [];
            let rows;
    
            // interval for loading (put in separate object later), some state value for loading 
            const mainButtonInterval = setInterval(() => {
                // tries several types of row search to find which tab its on
                // home 
                if (document.querySelectorAll('#scroll-container').length){
                    rows = document.querySelectorAll('#scroll-container')
                    console.log('mainButtons found ' + rows.length)
                    rows.forEach((row) => {
                        console.log('row')
                        console.log(row)
                        const temp = row.querySelectorAll('div ytd-grid-video-renderer, ytd-grid-channel-renderer');
                        const temp2 = [...temp]
                            .map((selector) => {
                                return new Button(selector);
                            })

                            channelButtons.push(temp2)
                    });
    
                    // put buttons into rows 
                    clearInterval(mainButtonInterval);
                    res(channelButtons);
                } else if (document.querySelectorAll('ytd-rich-grid-row').length) {
                    // videos, shorts
                    rows = document.querySelectorAll('ytd-rich-grid-row');
                    
                    rows.forEach((row) => {
                        const temp = row.querySelectorAll('ytd-rich-item-renderer');
                        const temp2 = [...temp]
                            .map((selector) => {
                                return new Button(selector);
                            })

                            channelButtons.push(temp2)
                    });

                } else if (document.querySelectorAll('ytd-item-section-renderer').length){
                    // channels 
                    rows = document.querySelectorAll('ytd-item-section-renderer')
                }

                if (rows){
                    res(channelButtons);
                }
            }, 500)
        })
    }

    loadButtons1 = async () => {
        this.hasSidebar = false;

        const sidebar = new ButtonGrid(this.getSidebarButtons, GridEnum.Col, 0);
        await sidebar.initialize()
        const mainGrid = new ButtonGrid(this.getMainVideos, GridEnum.Grid, 150);
        await mainGrid.initialize()

        this.GridHandler = new GridContainer(
            [
                [sidebar, mainGrid]
            ]
        )

        console.log(this.GridHandler);
        console.log('finished loading buttons')
    }

    loadButtons2 = async () => {
        this.hasSidebar = true;

        const sidebarGrid = new ButtonGrid(this.getSidebarVideos, GridEnum.Col, 70);
        await sidebarGrid.initialize()

        this.GridHandler = new GridContainer(
            [
                [sidebarGrid]
            ]
        )
    }

    loadButtons3 = async () => {
        this.hasSidebar = true;

        const paperTabs = new ButtonGrid(this.getPaperTabs, GridEnum.Row, 70, true);
        await paperTabs.initialize()

        const channelButtons = new ButtonGrid(this.getChannelButtons, GridEnum.Grid, 70);
        await channelButtons.initialize()

        const sidebarGrid = new ButtonGrid(this.getSidebarButtons, GridEnum.Col, 0);
        await sidebarGrid.initialize()

        this.GridHandler = new GridContainer(
            [
                [sidebarGrid, paperTabs],
                [sidebarGrid, channelButtons]
            ]
        )

        console.log(this.GridHandler);
        console.log('finished loading buttons')
    }

    playNextVideo = () => {
        document.querySelector('.ytp-next-button').click();
    }

    toggleSidebar = async () => {
        console.log('toggle sidebar')

        if (this.hasSidebar){
            console.log(document.querySelectorAll('#guide-button #button.style-scope.yt-icon-button'));
            document.querySelectorAll('#guide-button #button.style-scope.yt-icon-button')[0].click();

            this.sidebarActive = !this.sidebarActive;
            if (this.sidebarActive){
                this.GridHandler.resetGrid();

                // switch to sidebar
                // save prev
                this.mainGrid = this.GridHandler;

                // check sidebar
                if (this.sidebarGrid){
                    // set sidebar to cur
                    this.GridHandler = this.sidebarGrid
                } else {
                    // load sidebar
                    const sidebar = new ButtonGrid(this.getSidebarButtons, GridEnum.Col, 0);
                    await sidebar.initialize()

                    this.GridHandler = new GridContainer(
                        [
                            [sidebar]
                        ]
                    )
                }
            } else {
                // revert to original
                this.GridHandler = this.mainGrid
                this.GridHandler.resetGrid();
            }
           

            // // reset curr regardless
            // this.GridHandler.resetGrid();

            
        }
    }
}