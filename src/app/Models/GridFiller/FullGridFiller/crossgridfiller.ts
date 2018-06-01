import { FullGridFiller } from './fullgridfiller';

export class CrossGridFiller extends FullGridFiller {

    protected getColor(i: number, j: number) {
        const center_cell_columns = Math.round(this.grid.getColumn / 2);
        const center_cell_rows = Math.round(this.grid.getColumn / 2);

        return j === center_cell_columns || i === center_cell_rows ? 1 : 0;
    }

}
