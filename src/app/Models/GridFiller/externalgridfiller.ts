import {GridFiller} from './gridfiller';
import {Grid} from '../../Models/Grid/grid';

export class ExternalGridFiller extends GridFiller {

    gridModel: Grid;

    constructor (rows: number, columns: number, name: string) {
        super();
        this._id = GridFiller.incrementId();
        this.gridModel = new Grid(rows, columns);
        this._name = name;
    }

    public fill() {
        for (let i = 0 ; i < this.grid.getRows ; i++) {
            for (let j = 0 ; j < this.grid.getColumn ; j++) {
                this.grid[i][j] = this.gridModel[i][j];
            }
        }
    }

    public setColor(i: number, j: number, c: number) {
        if(i >= this.gridModel.getRows) {
            console.log("i is out of bound")
        } else if (j >= this.gridModel.getColumn) {
            console.log("j is out of bound")
        } else {
            this.gridModel[i][j] = c;
        }
    }

}
