import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoOfferForAssistantComponent } from './infoOfferForAssistant.component';

describe('InfoOfferForAssistantComponent', () => {
  let component: InfoOfferForAssistantComponent;
  let fixture: ComponentFixture<InfoOfferForAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoOfferForAssistantComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoOfferForAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
