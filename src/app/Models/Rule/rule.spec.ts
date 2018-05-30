import {Rule} from './rule';

describe('Rule', () => {

    it('should store the array of raw rule into the rule class', () => {
        const rule_raw = [false, true, true, false, false, false, true, true];
        const rule = new Rule(rule_raw);

        for (let i = 0 ; i < rule_raw.length ; i++) {
            expect(rule[i]).toEqual(rule_raw[i])
        }
    });

    it('should store the array of raw rule (too long) into the rule class', () => {
        const rule_raw = [false, true, true, false, false, false, true, true, false];
        const rule = new Rule(rule_raw);
        const array_size = Math.min(rule.length, rule_raw.length);

        expect(array_size).toEqual(8);

        for (let i = 0 ; i < array_size ; i++) {
            expect(rule[i]).toEqual(rule_raw[i])
        }
    });

  });
