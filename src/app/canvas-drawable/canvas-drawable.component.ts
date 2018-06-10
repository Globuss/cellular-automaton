import {
  Component, Input, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExternalGridFiller } from '../Models/GridFiller/externalgridfiller'

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';
import { Grid } from '../Models/Grid/grid';

@Component({
  selector: 'canvas-drawable',
  templateUrl: './canvas-drawable.component.html',
  styleUrls: ['./canvas-drawable.component.scss']
})
export class CanvasDrawableComponent implements OnInit {

  @ViewChild('canvas') public canvas: ElementRef;

  private width;
  private height;
  @Input() public max_width;
  @Input() public max_height;

  @Input() public rows: number;
  @Input() public columns: number;

  public drawable_name: string;
  private resize_ratio: number;

  private cx: CanvasRenderingContext2D;

  constructor() { 
    this.drawable_name = ""
  }

  reset() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    this.computeDimensions()

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);
  }

  ngOnInit() {
    this.reset();
  }

  computeDimensions() {
    let ratio_width = this.max_width / this.columns ;
    let ratio_height = this.max_height / this.rows ;
    this.resize_ratio = Math.floor(Math.min(ratio_height, ratio_width));

    this.height = Math.ceil(this.resize_ratio * this.rows);
    this.width = Math.ceil(this.resize_ratio * this.columns);
  }

  convertCanvasContentToFiller(raw_array: ImageData) {
    let grid_filler = new ExternalGridFiller(this.rows, this.columns, this.drawable_name);

    for(let i = 0 ; i < this.rows ; i++) {
      for(let j = 0 ; j < this.columns ; j++) {
        let color = this.getColorCanvasForResized(raw_array.data, j, i);
        grid_filler.setColor(i, j, color);
      }
    }

    return grid_filler;
  }

  getColorCanvasForResized(data_image, x, y) {
    let res = 0;
    for(let i = x * this.resize_ratio ; i <= x * this.resize_ratio + this.resize_ratio ; ++i) {
      for(let j = y * this.resize_ratio ; j <= y * this.resize_ratio + this.resize_ratio ; ++j) {
        res = res + this.getColorCanvasForCoordinates(data_image, i, j);
      }
    }
    let total_pixels = this.resize_ratio * this.resize_ratio;
    return res > (total_pixels * 0.3) ? 1 : 0;
  }

  getColorCanvasForCoordinates(data_image, x, y) {
    var red = y * (this.width * 4) + x * 4;
    var res = data_image[red] + data_image[red + 1] + data_image[red + 2] + data_image[red + 3];
    return res > 0 ? 1 : 0;
  }

  public createModel() {
    let raw_array = this.cx.getImageData(0, 0, this.width, this.height);
    let normal_array = this.convertCanvasContentToFiller(raw_array);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
  
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
  
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
  
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

}
