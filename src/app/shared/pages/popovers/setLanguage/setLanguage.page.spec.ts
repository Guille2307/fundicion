import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLanguagePopoverPage } from './setLanguage.page';

describe('LanguagePopoverPage', () => {
  let component: SetLanguagePopoverPage;
  let fixture: ComponentFixture<SetLanguagePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLanguagePopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLanguagePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
