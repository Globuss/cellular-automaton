import {GridFiller} from '../gridfiller';

export class GliderFiller extends GridFiller {

    constructor () {
        super();
        this._id = GridFiller.incrementId();
        this._name = 'Glider';
    }

    public fill() {
        this.grid[1][1] = 1;
        this.grid[2][2] = 1;
        this.grid[2][3] = 1;
        this.grid[1][3] = 1;
        this.grid[3][2] = 1;
    }

}
