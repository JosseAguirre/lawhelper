import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocutestComponent } from './docutest.component';

describe('DocutestComponent', () => {
  let component: DocutestComponent;
  let fixture: ComponentFixture<DocutestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocutestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocutestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
