import { FullGridFiller } from './fullgridfiller';

export class GridLines extends FullGridFiller {

    protected getColor(i: number, j: number) {
        return ( i + j ) % 2 === 0 ? true : false;
    }

}
