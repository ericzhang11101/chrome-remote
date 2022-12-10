import ButtonGrid from "./ButtonGrid";
import { GridEnum } from "./Enums";

export default class GridContainer {
    x: number; // keeps track of place inside buttongrid
    y: number;
    gridX: number; // keeps track of grids
    gridY: number;
    grids: ButtonGrid[][];
    active: boolean; // if button has been pressed

    constructor(
        gridInput: ButtonGrid[][]
    ) {
        this.grids = gridInput
        this.y = 0
        this.x = 0
        this.gridX = 0
        this.gridY = 0
        
    }

    _unhover(){
        const {x, y, gridX, gridY, grids} = this
        const currGrid = grids[gridY][gridX]
        currGrid.initialize()
        const currElement = currGrid.get(x,y)
        // currElement.initialize()
        currElement.visibleElement.classList.remove("hover-style");
    }

    hover(){
        const {x, y, gridX, gridY, grids} = this
        const currGrid = grids[gridY][gridX]
        const currElement = currGrid.get(x,y)
        
        const yOffset = currGrid.scrollOffset;

        if (yOffset){
            // scroll with offset
            const scrollY = currElement.visibleElement.getBoundingClientRect().top + window.pageYOffset - yOffset;
            window.scrollTo({top: scrollY, behavior: 'smooth'});
        }
        else {
            // use for sidebar
            currElement.visibleElement.scrollIntoView({behavior: 'smooth'})
        }

        currElement.visibleElement.classList.add("hover-style");
    }

    click(){
        const {x, y, gridX, gridY, grids} = this
        const currElement = grids[gridY][gridX].get(x,y)
        currElement.button.click();
    }

    handleFirstMovement = () => {
        this.hover();
        this.active = true;
    }

    moveDown = () => {
        if (!this.active) {
            this.handleFirstMovement();
            return
        }

        const {x, y, gridX, gridY, grids} = this

        this._unhover()

        const currGrid = grids[gridY][gridX];
        if (
            (currGrid.type === GridEnum.Col && y + 1 < currGrid.grid.length) || 
            (currGrid.type == GridEnum.Grid && y + 1 < currGrid.grid.length)
        ){
            // normal
            console.log('normal')
            this.y = y + 1;

            // check col is in range of next level
            if (x >= currGrid.grid[this.y].length){
                // move to last one if out of range
                this.x = currGrid.grid[this.y].length - 1;
            }

        } else {
            console.log('else')
            // move down
            if (gridY + 1 < grids.length){
                this.gridY ++;
            }
            else {
                this.gridY = 0;
            }

            // reset within grid 
            this.y = 0
            this.x = 0
        }
        
        this.hover();
    }

    moveUp = () => {
        if (!this.active) {
            this.handleFirstMovement();
            return
        }

        const {x, y, gridX, gridY, grids} = this
        this._unhover()

        const currGrid = grids[gridY][gridX];
        if (y > 0 ){
            // normal
            this.y = y - 1;

            // check col is in range of next level
            if (x >= currGrid.grid[this.y].length){
                // move to last one if out of range
                this.x = currGrid.grid[this.y].length - 1;
            }
        } else {
            // move down
            if (gridY == 0){
                this.gridY = grids.length - 1;
            }
            else {
                // last one
                this.gridY = gridY - 1;
            }
            // reset within grid 
            this.y = 0
            this.x = 0
        }
        this.hover();
    }

    moveRight = () => {
        if (!this.active) {
            this.handleFirstMovement();
            return
        }

        const {x, y, gridX, gridY, grids} = this
        this._unhover()

        const currGrid = grids[gridY][gridX];
        if (
            (currGrid.type === GridEnum.Row && x + 1 < currGrid.grid.length) ||
            (currGrid.type === GridEnum.Grid && x + 1 < currGrid.grid[y].length)
        ){
            // normal
            this.x = x + 1;

            // check col is in range of next level
            if (y >= currGrid.grid.length){
                // move to last one if out of range
                this.y = currGrid.grid.length - 1;
            }
        } else {
            // move grid right
            if (gridX + 1 < grids[gridY].length){
                this.gridX ++;
            }
            else {
                this.gridX = 0;
            }

            // reset within grid 
            this.y = 0
            this.x = 0
        }
        this.hover();
    }

    moveLeft = () => {
        if (!this.active) {
            this.handleFirstMovement();
            return
        }

        const {x, y, gridX, gridY, grids} = this
        this._unhover()

        const currGrid = grids[gridY][gridX];
        if (
            x !== 0
        ){
            // normal
            console.log('normal')
            this.x = x - 1;

            // check col is in range of next level
            if (y >= currGrid.grid.length){
                // move to last one if out of range
                this.y = currGrid.grid.length - 1;
            } 
        } else {
            console.log('else')
            // move grid right
            if (gridX == 0){
                this.gridX = grids[gridY].length - 1;
            }
            else {
                this.gridX = gridX - 1;
            }

            // reset within grid 
            this.y = 0
            this.x = 0
        }
        this.hover();
    }
}