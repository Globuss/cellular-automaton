import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rule } from '../../../Models/Rule/rule';

@Component({
  selector: 'ngx-modal',
  styleUrls: ['./createRule.component.scss'],
  templateUrl: 'createRule.component.html',
})
export class CreateRuleComponent {

  matrixRule: Array<Array<boolean>>;
  resRule: number;
  numberRule: number;
  name: string;
  rule_law: Array<number>;
  customCombinaisons: Array<number>;
  countMid: boolean;
  lib: Array<string> = ['Die','Born','Same state','Change state'];

  constructor(private activeModal: NgbActiveModal) { 
    this.initCombinaison();
    this.name = "";
    this.rule_law = Array(512).fill(0);
    this.countMid = true;
    this.customCombinaisons = Array();
  }

  initCombinaison(){
    this.matrixRule = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]

    this.resRule = 1;

    this.numberRule = 0;
  }

  addCombinaisaon(){
    let i  = this.matrixToNumber();
    this.rule_law[i] = this.resRule;
    
    if(this.customCombinaisons.indexOf(i) < 0){
      this.customCombinaisons.push(this.matrixToNumber());
    }

    this.initCombinaison();
  }

  setNumberRule(n: number){
    this.numberRule = n;
    this.forceRefreshMatrix();
  }

  getColor(x: number, y: number){
    return this.matrixRule[x][y];
  }

  changeState(x:number, y:number){
    this.matrixRule[x][y] = !this.matrixRule[x][y];
    this.numberRule = this.matrixToNumber();
  }

  changeStateResRule(){
    this.resRule++;
    if(this.resRule > 3){
      this.resRule = 0;
    }
  }

  forceRefreshMatrix(){
    this.matrixRule = this.numberToMatrix(this.numberRule);
  }

  matrixToNumber(){
    let res = 0;
    let it = 0;
    for(let i = 0; i < this.matrixRule.length; i++){
      for(let y = 0; y < this.matrixRule[i].length; y++){
        res += (this.matrixRule[i][y]) ? Math.pow(2, it) : 0;
        it++;
      }
    }
    return res;
  }

  toggleCountMid(countMid){
    this.countMid = countMid;
  }

  numberToMatrix(n: number){
    let res = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    let it = (res.length * res.length);
    for(let i = res.length;i--;){
      for(let y = res.length;y--;){
        --it;
        if(Math.pow(2, it) <= n){
          n -= Math.pow(2, it);
          res[i][y] = true;
        }
      }
    }
    return res;
  }

  closeModal() {
    this.activeModal.close({return:false});
  }

  createRule() {
    let r = new Rule(this.rule_law, this.name, this.countMid);
    this.activeModal.close({return: true, name: this.name});
  }
}