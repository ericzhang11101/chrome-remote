import { GridEnum } from "./Enums";

export default class ButtonGrid {
    grid: any[][];
    type: GridEnum;
    generatorFunction: () => any;
    scrollOffset: number;

    // buttons: Button

    constructor(
        generatorFunction: () => any,
        // buttonArray: any[][] | any[],
        type: GridEnum,
        scrollOffset?: number
    ) {
        this.generatorFunction = generatorFunction
        this.type = type
        if (scrollOffset){
            this.scrollOffset = scrollOffset
        }
    }

    initialize = async () => {
        this.grid = await this.generatorFunction();
    }

    get = (x: number, y:number) => {
        if (this.type === GridEnum.Grid){
            return this.grid[y][x];
        }
        else if (this.type === GridEnum.Col){
            return this.grid[y];
        }
        else {
            return this.grid[x];
        }
    } 
}