import { HeaderComponent } from './../../@theme/components/header/header.component';
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Grid } from '../../Models/Grid/grid';
import { Rule } from '../../Models/Rule/rule';
import { Chronometer } from '../../Models/Chronometer/chronometer';

import { GridFiller } from '../../Models/GridFiller/gridfiller';
import { GliderFiller } from '../../Models/GridFiller/GameOfLife/glider';
import { LoafFiller } from '../../Models/GridFiller/GameOfLife/loaf';
import { RandomGridFiller } from '../../Models/GridFiller/FullGridFiller/randomgridfiller';
import { CenterGridFiller } from '../../Models/GridFiller/FullGridFiller/centergridfiller';
import { GridLinesFiller } from '../../Models/GridFiller/FullGridFiller/gridlinesfiller';
import { CrossGridFiller } from '../../Models/GridFiller/FullGridFiller/crossgridfiller';

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
    rule: Rule;
    height: number;
    width: number;
    rows: number;
    columns: number;
    subscription: Subscription;
    gridFiller: GridFiller;
    cellSize: number;
    iteration_number: number;
    chronometer: Chronometer;
    stop: boolean;
    alive: number;

    constructor(private modalService: NgbModal, protected Util: CallService) {

        this.gridFiller = new GliderFiller();

        this.delayBetweenFrames = 100;
        // let rule_raw = [false, false, false, false, false, false, false, false];
        const rule_raw = Array(512).fill(0);
        this.stop = false;

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

        this.rule = new Rule(rule_raw);
        this.height = 400;
        this.width = 400;
        this.cellSize = 15;
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
        this.ctx.scale(1, 1);
    }

    ngOnInit() {

        this.subscription = this.Util.getClickCall().subscribe(message => {

            switch ( message.text ) {

                // We treat user actions
                case 'reset_canvas':
                    this.reset();
                    break;
                case 'start':
                    this.start();
                    break;
                case 'open_modal_create_rule':
                    const activeModal = this.modalService.open(CreateRuleComponent,
                        { size: 'lg', container: 'nb-layout' });
                    break;
                case 'pause':
                    this.stop = true;
                    break;
                case 'stop':
                    this.stop = true;
                    this.clearGridFromCanvas();
                    this.grid = null;
                    break;

                // We treat all fillers
                case 'filler_loaf':
                    this.applyNewFiller(new LoafFiller());
                    break;
                case 'filler_glider':
                    this.applyNewFiller(new GliderFiller());
                    break;
                case 'filler_random':
                    this.applyNewFiller(new RandomGridFiller());
                    break;
                case 'filler_center':
                    this.applyNewFiller(new CenterGridFiller());
                    break;
                case 'filler_gridlines':
                    this.applyNewFiller(new GridLinesFiller());
                    break;
                case 'filler_cross':
                    this.applyNewFiller(new CrossGridFiller());
                break;
            }
        });
    }

    applyNewFiller(filler: GridFiller) {
        this.gridFiller = filler;
        this.reset();
    }

    reset() {

        this.grid = null;
        this.iteration_number = 0;
        this.chronometer.reset();
        this.stop = false;

        this.width = this.myCanvas.nativeElement.clientWidth;
        this.height = this.myCanvas.nativeElement.clientHeight;

        this.columns = Math.round(this.myCanvas.nativeElement.clientWidth / ( this.cellSize));
        this.rows = Math.round(this.myCanvas.nativeElement.clientHeight / ( this.cellSize));

        this.myCanvas.nativeElement.width = this.width;
        this.myCanvas.nativeElement.height = this.height;


        this.grid = new Grid(this.rows, this.columns);
        this.gridFiller.setGrid(this.grid);

        this.gridFiller.fill();

        this.drawGridOnCanvas();
    }

      start() {

        if (this.grid == null) {
            this.reset();
        }

        this.chronometer.start();

        this.launch();
        this.stop = false;

    }

    launch() {

        this.drawGridOnCanvas();
        this.grid = this.updateGridWithGameRules();
        setTimeout(() => {
            if ( !this.stop ) {
                this.iteration_number++;
                this.launch();
            }
        }, this.delayBetweenFrames);

    }

    clearGridFromCanvas() {
        this.ctx.clearRect(0, 0, this.grid.getColumn * this.cellSize, this.grid.getRows * this.cellSize);
    }

    drawGridOnCanvas() {
        this.clearGridFromCanvas();
        let liveCount = 0;
        for (let row = 1; row < this.grid.getRows - 1; row++) { // iterate through rows
            for (let column = 1; column <  this.grid.getColumn - 1; column++) { // iterate through columns
                if (this.grid[row][column] === 1) {
                    /*this.ctx.fillStyle = 'rgb(' +
                                    Math.round(Math.random() * 255) + ',' +
                                    Math.round(Math.random() * 255) + ',' +
                                    Math.round(Math.random() * 255) + ')' ;*/
                    this.ctx.fillStyle = '#00ff00';
                    this.ctx.fillRect(column * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                    liveCount++;
                }else if ( this.grid[row][column] === 2 ) {
                    liveCount++;
                    this.ctx.fillStyle = '#0000ff';
                    this.ctx.fillRect(column * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
        this.alive = liveCount;
    }

    updateGridWithGameRules() {
        const copyGrid = new Grid(this.grid.getRows, this.grid.getColumn);

        for (let row = 1; row < this.grid.getRows - 1; row++) {
            for (let column = 1; column < this.grid.getColumn - 1; column++) {
                switch (this.grid.checkSituationCells(row, column, this.rule)) {
                    case 0:
                        copyGrid[row][column] = 0;
                        break;
                    case 1:
                        copyGrid[row][column] = 1;
                        break;
                    case 2:
                        copyGrid[row][column] = this.grid[row][column];
                        break;
                    case 3:
                        copyGrid[row][column] = 2;
                        break;
                    default:
                        copyGrid[row][column] = 0;
                }
            }
        }
        return copyGrid;
    }

}
