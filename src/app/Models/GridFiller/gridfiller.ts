import {Grid} from "../Grid/grid"

export abstract class GridFiller {

    constructor(private grid: Grid) {}

    public fill(){
        for (let i = 0 ; i < this.grid.getColumn ; i++) {
            for (let j = 0 ; j < this.grid.getRows ; j++) {
                this.grid[i][j] = this.getColor(i, j);
            }
        }
    }

    protected get getColumns(){
        return this.grid.getColumn;
    }

    protected get getRows(){
        return this.grid.getRows;
    }

    protected abstract getColor(i: number, j:number): boolean;

}