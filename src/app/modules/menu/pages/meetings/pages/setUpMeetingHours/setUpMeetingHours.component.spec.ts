import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetUpMeetingHoursComponent } from './setUpMeetingHours.component';

describe('ConfigDiaryMeetingSideComponent', () => {
  let component: SetUpMeetingHoursComponent;
  let fixture: ComponentFixture<SetUpMeetingHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpMeetingHoursComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetUpMeetingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
