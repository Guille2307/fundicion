import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {

  selected = false;
  @Output() sendEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onChange(ev) {
    this.selected = !this.selected
    this.sendEvent.emit(this.selected);
  }
}
