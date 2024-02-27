import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'form-control-error',
  templateUrl: './formControlError.component.html',
  styleUrls: ['./formControlError.component.scss'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ 'max-height': '0px', opacity: 0 }),
        animate(500, style({ 'max-height': '24px', opacity: 1 }))
      ]),
      transition(':leave', [
        animate(500, style({ 'max-height': '0px', opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlErrorComponent implements OnInit {

  // Component parameters
  @Input() set errorMessage(value: string) {
    this._errorMessage = value || this._errorMessage;
    this.errorMessageHidden = !value;

    if (!this.errorMessageHidden && this.autoHide) {
      if (this.autoHideTimeout){
        clearTimeout(this.autoHideTimeout);
      }

      this.autoHideTimeout = setTimeout(() => {
        this.errorMessageHidden = true;
        this.cdr.detectChanges();
      }, this.autoHideSpan);
    }

    this.cdr.detectChanges();
  }
  @Input() autoHide: boolean = false;
  @Input() autoHideSpan: number = 2000;

  // Class variables
  public _errorMessage: string = null;
  public errorMessageHidden: boolean = true;

  private autoHideTimeout: ReturnType<typeof setTimeout> = null;

  // Constructor
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  // OnInit
  ngOnInit(): void {
  }

}
