import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalSpinnerComponent } from './global-spinner';


describe('GlobalSpinner', () => {
  let component: GlobalSpinnerComponent;
  let fixture: ComponentFixture<GlobalSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
