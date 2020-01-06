import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RafflesDetailsComponent } from './raffles-details.component';

describe('RafflesDetailsComponent', () => {
  let component: RafflesDetailsComponent;
  let fixture: ComponentFixture<RafflesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RafflesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RafflesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
