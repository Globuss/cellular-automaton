import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Grid } from '../../Models/Grid/grid';
import { Rule } from '../../Models/Rule/rule';
import { Chronometer } from '../../Models/Chronometer/chronometer';

import { GridFiller } from '../../Models/GridFiller/gridfiller';
import { CenterGridFiller } from '../../Models/GridFiller/centergridfiller';
import { RandomGridFiller } from '../../Models/GridFiller/randomgridfiller';
import { GridLines } from '../../Models/GridFiller/gridlines';

import { CallService } from '../../Services/call.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateRuleComponent } from '../../Components/Modals/CreateRule/createRule.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements AfterViewInit, OnInit {

    ctx: CanvasRenderingContext2D;
    grid: Grid;
    delayBetweenFrames: number;
    rule : Rule; 
    height: number;
    width: number;
    subscription: Subscription;
    gridFiller: GridFiller;
    iteration_number: number;
    chronometer: Chronometer;

    constructor(private modalService: NgbModal, protected Util: CallService) {
        this.delayBetweenFrames = 0.2;
        let rule_raw = [true, false, true, false, false, true, true, false];
        this.rule = new Rule(rule_raw);
        this.iteration_number = 0;
        this.chronometer = new Chronometer();
    }

    @ViewChild('myCanvas') myCanvas: ElementRef;

    // ngAfterViewInit is called only after the view did load and the canvas is ready
    ngAfterViewInit() {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.ctx = this.myCanvas.nativeElement.getContext('2d');
        this.ctx.fillStyle = '#00ff00';
    }

    ngOnInit() {
 
        this.subscription = this.Util.getClickCall().subscribe(message => {

            switch(message.text) {
                case "reset_canvas":
                    this.reset();
                    break;
                case "start":
                    this.start();
                    break;
                case "open_modal_create_rule":
                    const activeModal = this.modalService.open(CreateRuleComponent, { size: 'lg', container: 'nb-layout' });
                    break;
            }
         
        });
    }

    reset() {

        this.grid = null;
        this.iteration_number = 0;
        this.chronometer.reset();

        this.height = this.myCanvas.nativeElement.clientHeight;
        this.width = this.myCanvas.nativeElement.clientWidth;
        console.log(this.height);
        console.log(this.width);

        this.grid = new Grid(this.width, this.height);
        this.gridFiller = new RandomGridFiller(this.grid);

        this.gridFiller.fill();

        this.drawGridOnCanvas();


        console.log('coucou');
    }

      start() {

        if (this.grid == null || this.gridFiller == null) {
            this.reset();
        }

        this.chronometer.start();

        this.launch();

    }

    launch() {

        this.drawGridOnCanvas();
        this.grid = this.updateGridWithGameRules();
        setTimeout(() => {
            this.iteration_number++;
            this.launch();   
        }, this.delayBetweenFrames);

    }

    clearGridFromCanvas() {
        this.ctx.clearRect(0, 0, this.grid.getRows, this.grid.getColumn);
    }

    drawGridOnCanvas() {
        this.clearGridFromCanvas();
        // let liveCount = 0;
        for (let row = 1; row < this.grid.getRows; row++) { // iterate through rows
            for (let column = 1; column <  this.grid.getColumn; column++) { // iterate through columns
                if (this.grid[row][column]) {
                    this.ctx.fillRect(row, column, 1, 1);
                    // liveCount++;
                }
            }
        }
    }

    updateGridWithGameRules() {
        const copyGrid = new Grid(this.grid.getRows, this.grid.getColumn);

        for (let row = 1; row <  this.grid.getRows - 1; row++) {
            for (let column = 1; column < this.grid.getColumn - 1; column++) {
                copyGrid[row][column] = this.grid.checkSituationCells(row, column,this.rule);                
              }
        }
        return copyGrid;
    }

}
