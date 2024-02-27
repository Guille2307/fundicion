import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssociateNewMeetDateComponent } from './associate-new-meet-date.component';

describe('AssociateNewMeetDateComponent', () => {
  let component: AssociateNewMeetDateComponent;
  let fixture: ComponentFixture<AssociateNewMeetDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateNewMeetDateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociateNewMeetDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
