import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-save',
  templateUrl: './buttonSave.component.html',
  styleUrls: ['./buttonSave.component.scss'],
})
export class ButtonSaveComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {}

}
