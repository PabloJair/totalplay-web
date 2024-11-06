import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSelectorDialogComponent } from './state-selector-dialog.component';

describe('StateSelectorDialogComponent', () => {
  let component: StateSelectorDialogComponent;
  let fixture: ComponentFixture<StateSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateSelectorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
