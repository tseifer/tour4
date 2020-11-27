import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetialComponent } from './hero-detial.component';

describe('HeroDetialComponent', () => {
  let component: HeroDetialComponent;
  let fixture: ComponentFixture<HeroDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
