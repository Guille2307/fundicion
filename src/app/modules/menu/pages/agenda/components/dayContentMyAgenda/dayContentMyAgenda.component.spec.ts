import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DayContentMyAgendaComponent } from './dayContentMyAgenda.component';

describe('DayContentMyAgendaComponent', () => {
  let component: DayContentMyAgendaComponent;
  let fixture: ComponentFixture<DayContentMyAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayContentMyAgendaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DayContentMyAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
