import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropperImgComponent } from './cropperImg.component';

describe('CropperImgComponent', () => {
  let component: CropperImgComponent;
  let fixture: ComponentFixture<CropperImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperImgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropperImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
