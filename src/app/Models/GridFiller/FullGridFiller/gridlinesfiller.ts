import { FullGridFiller } from './fullgridfiller';

export class GridLinesFiller extends FullGridFiller {

    protected getColor(i: number, j: number) {
        return ( i + j ) % 2 === 0 ? 1 : 0;
    }

}
