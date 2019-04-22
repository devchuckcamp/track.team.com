import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollinComponent } from './rollin.component';

describe('RollinComponent', () => {
  let component: RollinComponent;
  let fixture: ComponentFixture<RollinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
