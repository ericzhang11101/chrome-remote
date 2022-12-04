import ButtonGrid from "./ButtonGrid";
import { GridEnum } from "./Enums";
import { focusElement, getDomPath } from "./siteUtils";


export default class GridContainer {
    x: number; // keeps track of place inside buttongrid
    y: number;
    gridX: number; // keeps track of grids
    gridY: number;
    grids: ButtonGrid[][];

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
        const currElement = grids[gridY][gridX].get(x,y)
        currElement.visibleElement.classList.remove("hover-style");
        console.log('after unhover')
    }

    hover(){
        const {x, y, gridX, gridY, grids} = this
        const currElement = grids[gridY][gridX].get(x,y)

        currElement.visibleElement.scrollIntoView({behavior: 'smooth'})
        // focusElement(currElement.visibleElement)
        currElement.visibleElement.classList.add("hover-style");
    }

    click(){
        const {x, y, gridX, gridY, grids} = this
        const currElement = grids[gridY][gridX].get(x,y)
        currElement.visibleElement.focus();
        currElement.button.click();
    }

    moveDown = () => {
        const {x, y, gridX, gridY, grids} = this
        // const currElement = grids[gridY][gridX].get(x,y)
        // console.log(grids[gridX])

        this._unhover()
        // console.log('current element')
        // console.log(currElement.visibleElement)
        // console.log(currElement.visibleElement.focus);

        const currGrid = grids[gridY][gridX];
        if (
            (currGrid.type === GridEnum.Col && y + 1 < currGrid.grid.length) || 
            (currGrid.type == GridEnum.Grid && y + 1 < currGrid.grid.length)
        ){
            // normal
            console.log('normal')
            this.y = y + 1;
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
        const {x, y, gridX, gridY, grids} = this
        this._unhover()
        console.log('prev y ' + y)
        console.log('prev grid ' + gridY)
        const currGrid = grids[gridX][gridY];
        if (y > 0 ){
            // normal
            console.log('normal')
            this.y = y - 1;
        } else {
            console.log('else')
            // move down
            if (gridY + 1 < grids.length){
                this.gridY --;
            }
            else {
                // last one
                this.gridY = grids.length - 1;
            }

            // reset within grid 
            this.y = 0
            this.x = 0
        }

        console.log('prev y ' + y)
        console.log('prev grid ' +  gridY)
        
        this.hover();
    }

    moveRight = () => {
        const {x, y, gridX, gridY, grids} = this
        console.log('prev x ' + x)
        console.log('prev grid ' + gridX)
        this._unhover()

        console.log('grids')
        console.log(grids);
        console.log(gridX)
        console.log(gridY)
        const currGrid = grids[gridY][gridX];
        console.log('curr grid')
        console.log(currGrid)
        if (
            (currGrid.type === GridEnum.Row && x + 1 < currGrid.grid.length) ||
            (currGrid.type == GridEnum.Grid && x + 1 < currGrid.grid[0].length)
        ){
            // normal
            console.log('normal')
            this.x = x + 1;
        } else {
            console.log('else')
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

        console.log('new x ' + x)
        console.log('new grid ' +  gridX + " " + gridY)
        
        this.hover();
    }
}