import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpresponseComponent } from './ppresponse.component';

describe('PpresponseComponent', () => {
  let component: PpresponseComponent;
  let fixture: ComponentFixture<PpresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
