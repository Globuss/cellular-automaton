import {GridFiller} from "../GridFiller/gridfiller"

export class CenterGridFiller extends GridFiller {

    protected getColor(i: number, j:number) {
        let center_cell = Math.round(this.getRows / 2);
        return i == center_cell ? true : false;
    }

}