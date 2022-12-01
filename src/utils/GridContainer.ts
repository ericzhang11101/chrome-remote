import ButtonGrid from "./ButtonGrid";
import { GridEnum } from "./Enums";

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

    }

    hover(){
        const {x, y, gridX, gridY, grids} = this
        const currElement = grids[gridY][gridX].get(x,y)
        currElement.visibleElement.classList.add("hover-style");
    }

    click(){

    }

    moveDown = () => {
        const {x, y, gridX, gridY, grids} = this
        // const currElement = grids[gridY][gridX].get(x,y)
        // console.log(grids[gridX])

        this._unhover()
        // console.log('current element')
        // console.log(currElement.visibleElement)
        // console.log(currElement.visibleElement.focus);

        const currGrid = grids[gridX][gridY];
        if (
            (currGrid.type === GridEnum.Col && y + 1 < currGrid.grid.length) || 
            (currGrid.type == GridEnum.Grid && y + 1 < currGrid.grid[0].length)
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
        // const currElement = grids[gridY][gridX].get(x,y)
        // console.log(grids[gridX])

        this._unhover()
        // console.log('current element')
        // console.log(currElement.visibleElement)
        // console.log(currElement.visibleElement.focus);
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
}