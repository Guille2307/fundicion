import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tooltip-error',
  templateUrl: './tooltipError.component.html',
  styleUrls: ['./tooltipError.component.scss'],
})
export class TooltipErrorComponent implements OnInit {

  @Input() isButton = false;

  constructor() { }

  ngOnInit() {}

}
