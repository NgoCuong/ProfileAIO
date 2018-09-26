import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileaioComponent } from './profileaio.component';

describe('ProfileaioComponent', () => {
  let component: ProfileaioComponent;
  let fixture: ComponentFixture<ProfileaioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileaioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileaioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
