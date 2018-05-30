import {Rule} from './rule'; 

describe('Rule', () => {
    let rule: Rule;
    let rule_raw = [false, true, true, false, false, false, true, true];
  
    beforeEach(() => { 
      rule = new Rule(rule_raw);
    });

    it('should store the array of raw rule into the rule class', () => {
        for(let i = 0 ; i < rule_raw.length ; i++) {
            expect(rule[i]).toEqual(rule_raw[i])
        }
    });

    it('should store the array of raw rule (too long) into the rule class', () => {
        var rule_raw = [false, true, true, false, false, false, true, true, false];
        var rule = new Rule(rule_raw);
        var array_size = Math.min(rule.length, rule_raw.length);

        expect(array_size).toEqual(8);

        for(let i = 0 ; i < array_size ; i++) {
            expect(rule[i]).toEqual(rule_raw[i])
        }
    });
  
    afterEach(() => { 
      rule = null;
    });

  });