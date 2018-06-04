import { HeaderComponent } from './../../@theme/components/header/header.component';
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
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

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements AfterViewInit, OnInit {

    ctx: CanvasRenderingContext2D;
    grid: Grid;
    delayBetweenFrames: number;
    rule: Rule = null;
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
    config: ToasterConfig;

    position = 'toast-top-right';
    animationType = 'fade';
    title = 'HI there!';
    content = `I'm cool toaster!`;
    timeout = 5000;
    toastsLimit = 5;
    type = 'default';
  
    isNewestOnTop = true;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;

    constructor(private modalService: NgbModal, protected Util: CallService, private toasterService: ToasterService) {

        this.gridFiller = new GliderFiller();

        this.delayBetweenFrames = 100;
        // let rule_raw = [false, false, false, false, false, false, false, false];
        this.stop = false;
        Rule.createGameOfLifeRule();

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
                case 'game':
                    const ruleTemp = Rule.getById(parseInt(message.data.id));
                    if (ruleTemp !== null) {
                        this.rule = ruleTemp;
                        this.reset();
                    }
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
        if(this.rule !== null){
            this.drawGridOnCanvas();
            this.grid = this.updateGridWithGameRules();
            setTimeout(() => {
                if ( !this.stop ) {
                    this.iteration_number++;
                    this.launch();
                }
            }, this.delayBetweenFrames);
        }else{
            this.showToast("error","Error","You need to precise a rule");
        }

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

    private showToast(type: string, title: string, body: string) {
        this.config = new ToasterConfig({
          positionClass: this.position,
          timeout: this.timeout,
          newestOnTop: this.isNewestOnTop,
          tapToDismiss: this.isHideOnClick,
          preventDuplicates: this.isDuplicatesPrevented,
          animation: this.animationType,
          limit: this.toastsLimit,
        });
        const toast: Toast = {
          type: type,
          title: title,
          body: body,
          timeout: this.timeout,
          showCloseButton: this.isCloseButton,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
      }
    
      clearToasts() {
        this.toasterService.clear();
    }

}
