import { Grid } from '../Grid/grid';

export abstract class GridFiller {

    constructor(protected grid: Grid) {}

    public abstract fill();

}
