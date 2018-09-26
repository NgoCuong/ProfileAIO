import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxygenComponent } from './proxygen.component';

describe('ProxygenComponent', () => {
  let component: ProxygenComponent;
  let fixture: ComponentFixture<ProxygenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxygenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
