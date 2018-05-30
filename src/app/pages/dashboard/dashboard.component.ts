import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Grid } from '../../Models/Grid/grid';
import { ShapeService } from '../../Services/shape.service';
import { Rule } from '../../Models/Rule/rule';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {
    ctx: CanvasRenderingContext2D;
    grid: Grid;
    delayBetweenFrames: number;
    rule : Rule; 

    constructor(protected shapeService: ShapeService) {
        this.delayBetweenFrames = 0;
        let rule_raw = [true, false, true, false, false, true, true, false];
        this.rule = new Rule(rule_raw);      
    }
    @ViewChild('myCanvas') myCanvas: ElementRef;

    // ngAfterViewInit is called only after the view did load and the canvas is ready
    ngAfterViewInit() {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.ctx = this.myCanvas.nativeElement.getContext('2d');
        this.ctx.fillStyle = '#00ff00';
    }

      // start is a function which loops by custom frames
      start() {
        this.clearGridFromCanvas();
        this.drawGridOnCanvas();
        this.grid = this.updateGridWithGameRules();
        setTimeout(() => {
            this.start();
        }, this.delayBetweenFrames);
    }

    clearGridFromCanvas() {
        this.ctx.clearRect(0, 0, this.grid.getRows, this.grid.getColumn);
    }

    drawGridOnCanvas() {
        let liveCount = 0;
        for (let row = 1; row < this.grid.getRows; row++) { // iterate through rows
            for (let column = 1; column <  this.grid.getColumn; column++) { // iterate through columns
                if (this.grid[row][column]) {
                    this.ctx.fillRect(row, column, 1, 1);
                    liveCount++;
                }
            }
        }
    }

    updateGridWithGameRules() {
        const copyGrid = new Grid(this.grid.getRows, this.grid.getColumn);

        for (let row = 1; row <  this.grid.getRows - 1; row++) {
            for (let column = 1; column < this.grid.getColumn - 1; column++) {

                //const totalCells = this.grid.checkSurroundingsCells(row, column);
                copyGrid[row][column] = this.grid.checkSituationCells(row, column,this.rule);                
                // apply the rules to each cell:
                // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
                // Any live cell with two or three live neighbours lives on to the next generation.
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
                // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                
            }
        }
        return copyGrid;
    }

    // UIButtons
    // When user press on one of the shapes this function is called and
    // passing by the chosen type to the shapeService which implement the
    // shape inside the grid automatically for us
    switchShapeTapped(type) {
        this.grid = null;
        // I think this (400 hardcoded) is more readable in less code than
        // decalre a variable because we use it only once
        this.grid = new Grid(400,400);
        this.shapeService.initShapeType(type, this.grid);
        this.start();
    }
}
