import {GridFiller} from '../gridfiller';

export abstract class FullGridFiller extends GridFiller {

    public fill() {
        for (let i = 0 ; i < this.grid.getRows ; i++) {
            for (let j = 0 ; j < this.grid.getColumn ; j++) {
                this.grid[i][j] = this.getColor(i, j);
            }
        }
    }

    protected abstract getColor(i: number, j: number): number;

}
