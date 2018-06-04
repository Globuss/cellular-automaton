import { FullGridFiller } from './fullgridfiller';

export class GridLinesFiller extends FullGridFiller {

    constructor () {
        super();
        this._name = 'GridLines';
    }

    protected getColor(i: number, j: number) {
        return ( i + j ) % 2 === 0 ? 1 : 0;
    }

}
