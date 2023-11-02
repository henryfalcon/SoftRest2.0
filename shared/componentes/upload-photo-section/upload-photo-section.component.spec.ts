import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotoSectionComponent } from './upload-photo-section.component';

describe('UploadPhotoSectionComponent', () => {
  let component: UploadPhotoSectionComponent;
  let fixture: ComponentFixture<UploadPhotoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPhotoSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPhotoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
