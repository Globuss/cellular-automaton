export class Rule extends Array  {

    // 0 : die
    // 1 : born
    // 2 : same state
    // 3 : change

    constructor(cases: Array<number>) {
        super(512);
        Object.setPrototypeOf(this, Rule.prototype);
        this._build(cases);
    }

    _build(cases: Array<number>) {
        const array_size = Math.min(this.length, cases.length);

        for (let i = 0; i < array_size; i++) {
            this[i] = cases[i];
        }

        if (array_size < this.length) {
            for (let i = array_size; i < this.length; i++) {
                this[i] = false;
            }
        }
    }

}
