import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionApp } from './construction-app';

describe('ConstructionApp', () => {
  let component: ConstructionApp;
  let fixture: ComponentFixture<ConstructionApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
