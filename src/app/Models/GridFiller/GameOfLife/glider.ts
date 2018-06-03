import {GridFiller} from '../gridfiller';

export class GliderFiller extends GridFiller {

    public fill() {
        this.grid[1][1] = 1;
        this.grid[2][2] = 1;
        this.grid[2][3] = 1;
        this.grid[1][3] = 1;
        this.grid[3][2] = 1;
    }

}
