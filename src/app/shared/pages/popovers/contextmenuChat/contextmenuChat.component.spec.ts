import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContextmenuChatComponent } from './contextmenuChat.component';

describe('ContextmenuChatComponent', () => {
  let component: ContextmenuChatComponent;
  let fixture: ComponentFixture<ContextmenuChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextmenuChatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContextmenuChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
