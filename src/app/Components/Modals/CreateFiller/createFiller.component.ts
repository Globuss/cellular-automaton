import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CanvasDrawableComponent } from '../../../canvas-drawable/canvas-drawable.component';


@Component({
  selector: 'ngx-modal',
  templateUrl: 'createFiller.component.html',
})
export class CreateFillerComponent {

  @Input() public rows;
  @Input() public columns;

  @ViewChild(CanvasDrawableComponent) myComponent: CanvasDrawableComponent;
  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }

  createFiller() {
    this.myComponent.createModel();
    this.activeModal.close({return: true, name: this.myComponent.drawable_name});
  }

  resetFiller() {
    this.myComponent.reset();
  }
}