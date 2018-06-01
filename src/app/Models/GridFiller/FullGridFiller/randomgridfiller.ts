import { FullGridFiller } from './fullgridfiller';

export class RandomGridFiller extends FullGridFiller {

    protected getColor(i: number, j: number) {
        return Math.round(Math.random());
    }

}
