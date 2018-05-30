export class Rule extends Array  {

    constructor(cases: Array<boolean>) {
        super(8);
        Object.setPrototypeOf(this, Rule.prototype);
        this._build(cases);
    }

    _build(cases: Array<boolean>) {
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
