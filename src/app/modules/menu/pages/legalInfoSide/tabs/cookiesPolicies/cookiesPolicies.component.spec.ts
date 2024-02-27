import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CookiesPoliciesSideComponent } from './cookiesPolicies.component';

describe('CookiesPoliciesSideComponent', () => {
  let component: CookiesPoliciesSideComponent;
  let fixture: ComponentFixture<CookiesPoliciesSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiesPoliciesSideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CookiesPoliciesSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
