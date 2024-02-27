import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivacyPoliciesSideComponent } from './privacyPolicies.component';

describe('PrivacyPoliciesSideComponent', () => {
  let component: PrivacyPoliciesSideComponent;
  let fixture: ComponentFixture<PrivacyPoliciesSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPoliciesSideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPoliciesSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
