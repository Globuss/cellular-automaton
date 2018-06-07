import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  templateUrl: 'settings.component.html',
})
export class SettingsComponent {

  @Input() color: string;
  @Input() cellSize: number;
  @Input() iteration_max: number;
  @Input() delayBetweenFrames: number;

  constructor(private activeModal: NgbActiveModal) {  }

  closeModal() {
    this.activeModal.close({color: this.color, cellSize: this.cellSize, delayBetweenFrames: this.delayBetweenFrames, iteration_max: this.iteration_max});
  }

  saveSettings() {
    this.closeModal();
  }
}