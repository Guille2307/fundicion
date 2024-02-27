import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SponsorsIninityBarComponent } from './sponsorsInfinityBar.component';

describe('SponsorsIninityBarComponent', () => {
  let component: SponsorsIninityBarComponent;
  let fixture: ComponentFixture<SponsorsIninityBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsIninityBarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorsIninityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
