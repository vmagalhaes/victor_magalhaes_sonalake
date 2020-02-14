import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormCharacterComponent } from './form-character.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormCharacterComponent', () => {
  let component: FormCharacterComponent;
  let fixture: ComponentFixture<FormCharacterComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule, ReactiveFormsModule ],
      declarations: [ FormCharacterComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FormCharacterComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
      element = fixture.debugElement.nativeElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to true', async(() => {
    // form true
    component.form.get('name').setValue('Yoda');
    component.form.get('species').setValue('Cerean');
    component.form.get('gender').setValue('male');
    component.form.get('homeworld').setValue('Star');

    component.onSubmit();

    expect(component.isLoading).toBeTruthy();
  }));

  it('should call the onSubmit method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    const buttonElement = element.querySelector('#submit-button');
    buttonElement.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

  it('form should be valid', async(() => {
    component.form.get('name').setValue('Yoda');
    component.form.get('species').setValue('Cerean');
    component.form.get('gender').setValue('male');
    component.form.get('homeworld').setValue('Star');
    expect(component.form.valid).toBeTruthy();
  }));

  it('form should be invalid', async(() => {
    component.form.get('name').setValue('');
    component.form.get('species').setValue('');
    component.form.get('gender').setValue('');
    component.form.get('homeworld').setValue('');
    expect(component.form.invalid).toBeTruthy();
  }));
});
