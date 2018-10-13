import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyMenuComponent } from './proxy-menu.component';

describe('ProxyMenuComponent', () => {
  let component: ProxyMenuComponent;
  let fixture: ComponentFixture<ProxyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
