import { FullGridFiller } from './fullgridfiller';

export class CenterGridFiller extends FullGridFiller {

    protected getColor(i: number, j: number) {
        const center_cell = Math.round(this.grid.getRows / 2);
        return i === center_cell ? true : false;
    }

}
