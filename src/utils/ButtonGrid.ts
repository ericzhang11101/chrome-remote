import { GridEnum } from "./Enums";

export default class ButtonGrid {
    left: ButtonGrid;
    right: ButtonGrid;
    top: ButtonGrid;
    bottom: ButtonGrid;
    grid: any[][];
    type: GridEnum;
    neighbours: ButtonGrid[] | undefined;

    // buttons: Button

    constructor(
        buttonArray: any[][] | any[],
        type: GridEnum,
        neighbours?: ButtonGrid[]
    ) {
        this.grid = buttonArray
        this.type = type
        this.neighbours = neighbours
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

   setLeft = (newLeft: any): void => {
    this.left = newLeft;
   }
   setRight = (newRight: any) => {
    this.right = newRight;
   }
   setTop = (setTop: any) => {
    this.top = setTop;
   }
   setBottom = (newBottom: any) => {
    this.bottom = newBottom;
   }
   
}