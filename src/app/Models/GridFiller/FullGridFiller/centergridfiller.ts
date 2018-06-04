import { FullGridFiller } from './fullgridfiller';

export class CenterGridFiller extends FullGridFiller {

    constructor () {
        super();
        this._name = 'Center';
    }

    protected getColor(i: number, j: number) {
        const center_cell = Math.round(this.grid.getColumn / 2);
        return j === center_cell ? 1 : 0;
    }

}
