import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CanvasDrawableComponent } from '../../../canvas-drawable/canvas-drawable.component';


@Component({
  selector: 'ngx-modal',
  templateUrl: 'createFiller.component.html',
})
export class CreateFillerComponent {

  @ViewChild('bod') public myDiv: ElementRef;

  @Input() public rows;
  @Input() public columns;

  @ViewChild(CanvasDrawableComponent) myComponent: CanvasDrawableComponent;
  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }

  createRule() {
    this.myComponent.createModel();
    this.activeModal.close();
  }
}