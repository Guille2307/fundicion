import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamificationComponent } from './gamification.component';

describe('GamificationComponent', () => {
  let component: GamificationComponent;
  let fixture: ComponentFixture<GamificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamificationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
