import { GridEnum } from "./Enums";

export default class ButtonGrid {
    grid: any[][];
    type: GridEnum;
    generatorFunction: () => any;

    // buttons: Button

    constructor(
        generatorFunction: () => any,
        // buttonArray: any[][] | any[],
        type: GridEnum,
    ) {
        this.generatorFunction = generatorFunction
        this.type = type
    }

    initialize = async () => {
        this.grid = await this.generatorFunction();
    }

    get = (x: number, y:number) => {
        console.log('getting')
        console.log(this.grid)
        console.log(x + " " + y)
        if (this.type === GridEnum.Grid){
            console.log('a')
            console.log(this.grid[y][x]);
            return this.grid[y][x];
        }
        else if (this.type === GridEnum.Col){
            console.log('b')
            return this.grid[y];
        }
        else {
            console.log('c')
            return this.grid[x];
        }
    } 

    refresh = () => {

    }
}