import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Input() transparent = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() translation = '';
  @Input() translationParams = {};

  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  click(ev) {
    this.onClick.emit(ev);
  }
}
