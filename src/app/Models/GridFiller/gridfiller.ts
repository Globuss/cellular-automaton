import { Grid } from '../Grid/grid';

export abstract class GridFiller {

    grid: Grid;

    constructor() {}

    setGrid(grid: Grid) {
        this.grid = grid;
    }

    public abstract fill();

}
