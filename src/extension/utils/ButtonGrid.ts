import { GridEnum } from "./Enums";

export default class ButtonGrid {
    grid: any[][];
    type: GridEnum;
    generatorFunction: () => any;
    scrollOffset: number;
    resetOnClick: boolean;

    // buttons: Button

    constructor(
        generatorFunction: () => any,
        // buttonArray: any[][] | any[],
        type: GridEnum,
        scrollOffset?: number,
        resetOnClick?: boolean
    ) {
        this.generatorFunction = generatorFunction
        this.type = type
<<<<<<< Updated upstream
        if (scrollOffset){
            this.scrollOffset = scrollOffset
        }
        this.resetOnClick = resetOnClick
    }

    initialize = async () => {
        this.grid = await this.generatorFunction();
=======
>>>>>>> Stashed changes
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