import {GridFiller} from '../GridFiller/gridfiller';

export class GridLines extends GridFiller {

    protected getColor(i: number, j: number) {
        return ( i + j ) % 2 === 0 ? true : false;
    }

}
