import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapEventComponent } from './mapEvent.component';

describe('MapEventComponent', () => {
  let component: MapEventComponent;
  let fixture: ComponentFixture<MapEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEventComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
