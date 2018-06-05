import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rule } from '../../../Models/Rule/rule';

@Component({
  selector: 'ngx-modal',
  templateUrl: 'createFiller.component.html',
})
export class CreateFillerComponent {

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }

  createRule() {
    this.activeModal.close();
  }
}