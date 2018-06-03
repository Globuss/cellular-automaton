export class Rule {

    // 0 : die
    // 1 : born
    // 2 : same state
    // 3 : change

    _id: number;
    _rule: Array<number>;
    _name: string;
    _countMid: boolean;
    static _rules: Array<Rule> = Array(0);
    static latestId: number = 1;

    constructor(cases: Array<number>, name: string, countMid: boolean = true) {
        this._rule = Array(512);
        Object.setPrototypeOf(this, Rule.prototype);
        this._build(cases);
        this._name = name;
        this._countMid = countMid;
        this._id = Rule.incrementId();
        Rule.rules.push(this);
    }

    _build(cases: Array<number>) {
        const array_size = Math.min(this._rule.length, cases.length);

        for (let i = 0; i < array_size; i++) {
            this._rule[i] = cases[i];
        }

        if (array_size < this._rule.length) {
            for (let i = array_size; i < this._rule.length; i++) {
                this._rule[i] = 0;
            }
        }
    }

    static getAll() {
        return Rule.rules;
    }

    static getById(id: number) {
        let res = null;
        for ( let i = 0; i < Rule.rules.length; i++ ) {
            if ( Rule.rules[i].id === id) {
                res = Rule.rules[i];
                break;
            }
        }
        return res;
    }

    static getByName(name: string) {
        let res = null;
        for (let i = 0; i < Rule.rules.length; i++) {
            if (Rule.rules[i].name === name) {
                res = Rule.rules[i];
                break;
            }
        }
        return res;
    }

    static createGameOfLifeRule() {
        const rule_raw = Array(512).fill(0);
        rule_raw[7] = 1;
        rule_raw[11] = 1;
        rule_raw[35] = 1;
        rule_raw[67] = 1;
        rule_raw[131] = 1;
        rule_raw[259] = 1;
        rule_raw[13] = 1;
        rule_raw[37] = 1;
        rule_raw[69] = 1;
        rule_raw[133] = 1;
        rule_raw[261] = 1;
        rule_raw[41] = 1;
        rule_raw[73] = 1;
        rule_raw[137] = 1;
        rule_raw[265] = 1;
        rule_raw[97] = 1;
        rule_raw[161] = 1;
        rule_raw[289] = 1;
        rule_raw[193] = 1;
        rule_raw[321] = 1;
        rule_raw[385] = 1;
        rule_raw[14] = 1;
        rule_raw[38] = 1;
        rule_raw[70] = 1;
        rule_raw[134] = 1;
        rule_raw[262] = 1;
        rule_raw[42] = 1;
        rule_raw[74] = 1;
        rule_raw[138] = 1;
        rule_raw[266] = 1;
        rule_raw[98] = 1;
        rule_raw[162] = 1;
        rule_raw[290] = 1;
        rule_raw[194] = 1;
        rule_raw[322] = 1;
        rule_raw[386] = 1;
        rule_raw[44] = 1;
        rule_raw[76] = 1;
        rule_raw[140] = 1;
        rule_raw[268] = 1;
        rule_raw[100] = 1;
        rule_raw[164] = 1;
        rule_raw[292] = 1;
        rule_raw[196] = 1;
        rule_raw[324] = 1;
        rule_raw[388] = 1;
        rule_raw[104] = 1;
        rule_raw[168] = 1;
        rule_raw[296] = 1;
        rule_raw[200] = 1;
        rule_raw[328] = 1;
        rule_raw[392] = 1;
        rule_raw[224] = 1;
        rule_raw[352] = 1;
        rule_raw[416] = 1;
        rule_raw[448] = 1;
        rule_raw[3] = 2;
        rule_raw[5] = 2;
        rule_raw[9] = 2;
        rule_raw[33] = 2;
        rule_raw[65] = 2;
        rule_raw[129] = 2;
        rule_raw[257] = 2;
        rule_raw[6] = 2;
        rule_raw[10] = 2;
        rule_raw[34] = 2;
        rule_raw[66] = 2;
        rule_raw[130] = 2;
        rule_raw[258] = 2;
        rule_raw[12] = 2;
        rule_raw[36] = 2;
        rule_raw[68] = 2;
        rule_raw[132] = 2;
        rule_raw[260] = 2;
        rule_raw[40] = 2;
        rule_raw[72] = 2;
        rule_raw[136] = 2;
        rule_raw[264] = 2;
        rule_raw[96] = 2;
        rule_raw[160] = 2;
        rule_raw[288] = 2;
        rule_raw[192] = 2;
        rule_raw[320] = 2;
        rule_raw[384] = 2;

        new Rule(rule_raw, 'Game of Life', false);
    }

    static incrementId() {
        if (!Rule.latestId) Rule.latestId = 1
        else Rule.latestId++
        return Rule.latestId
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get rule(){
        return this._rule;
    }

    static get rules(){
        return Rule._rules;
    }

}
