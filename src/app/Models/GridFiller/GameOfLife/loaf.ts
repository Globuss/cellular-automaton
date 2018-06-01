import {GridFiller} from '../gridfiller';

export class LoafFiller extends GridFiller {

    public fill() {
        this.grid[1][2] = 1;
        this.grid[1][3] = 1;
        this.grid[2][1] = 1;
        this.grid[3][2] = 1;
        this.grid[4][3] = 1;
        this.grid[2][4] = 1;
        this.grid[3][4] = 1;
    }

}