import {GridFiller} from '../GridFiller/gridfiller';

export class RandomGridFiller extends GridFiller {

    protected getColor(i: number, j: number) {
        return Math.round(Math.random()) === 1;
    }

}
