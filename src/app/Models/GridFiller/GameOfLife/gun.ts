import {GridFiller} from '../gridfiller';

export class GunFiller extends GridFiller {

    public fill() {
        this.grid[5][1] = 1;
        this.grid[6][1] = 1;
        this.grid[5][2] = 1;
        this.grid[6][2] = 1;

        this.grid[3][36] = 1;
        this.grid[4][36] = 1;
        this.grid[3][35] = 1;
        this.grid[4][35] = 1;

        this.grid[5][11] = 1;
        this.grid[6][11] = 1;
        this.grid[7][11] = 1;
        this.grid[4][12] = 1;
        this.grid[3][13] = 1;
        this.grid[3][14] = 1;
        this.grid[8][12] = 1;
        this.grid[9][13] = 1;
        this.grid[9][14] = 1;
        this.grid[6][15] = 1;
        this.grid[4][16] = 1;
        this.grid[8][16] = 1;
        this.grid[7][17] = 1;
        this.grid[5][17] = 1;
        this.grid[6][17] = 1;
        this.grid[6][18] = 1;

        this.grid[5][21] = 1;
        this.grid[4][21] = 1;
        this.grid[3][21] = 1;
        this.grid[5][22] = 1;
        this.grid[4][22] = 1;
        this.grid[3][22] = 1;
        this.grid[6][23] = 1;
        this.grid[2][23] = 1;
        this.grid[2][25] = 1;
        this.grid[1][25] = 1;
        this.grid[7][25] = 1;
        this.grid[6][25] = 1;
    }

}
