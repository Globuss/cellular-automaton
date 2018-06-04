import { FullGridFiller } from './fullgridfiller';

export class RandomGridFiller extends FullGridFiller {

    constructor () {
        super();
        this._name = 'Random';
    }

    protected getColor(i: number, j: number) {
        return Math.round(Math.random());
    }

}
