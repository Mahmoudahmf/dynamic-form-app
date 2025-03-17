import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


const STORAGE_KEY='formState';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  standalone:true
})
export class DynamicFormComponent implements OnInit {
  formConfig: any;
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loadFormConfig();
  }

  loadFormConfig() {
    this.http.get('assets/form.json').subscribe((config: any) => {
      this.formConfig = config;
      this.dynamicForm = this.createForm(config.fields);
      this.dynamicForm.valueChanges.subscribe(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.dynamicForm.value));
      });
    });
  }

  createForm(fields: any[]): FormGroup {
    let group: any = {};
    fields.forEach(field => {
      if (field.type === 'group') {
        group[field.name] = this.fb.group(this.createGroupFields(field.fields));
      } else if (field.type === 'array') {
        group[field.name] = this.fb.array([]);
      } else {
        group[field.name] = new FormControl('', this.getValidators(field));
      }
    });
    return this.fb.group(group);
  }

  createGroupFields(fields: any[]): { [key: string]: FormControl } {
    let groupFields: any = {};
    fields.forEach(field => {
      groupFields[field.name] = new FormControl('', this.getValidators(field));
    });
    return groupFields;
  }

  getValidators(field: any) {
    let validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.minLength) validators.push(Validators.minLength(field.minLength));
    if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
    if (field.pattern) validators.push(Validators.pattern(field.pattern));
    if (field.type === 'email') validators.push(Validators.email);
    return validators;
  }

  getFormArray(fieldName: string): FormArray {
    return this.dynamicForm.get(fieldName) as FormArray;
  }

  addArrayItem(fieldName: string) {
    this.getFormArray(fieldName).push(new FormControl('', Validators.required));
  }

  removeArrayItem(fieldName: string, index: number) {
    this.getFormArray(fieldName).removeAt(index);
  }

  isInvalid(fieldPath: string): boolean {
    const control = this.dynamicForm.get(fieldPath);
    return !!control?.invalid && !!control?.touched;
  }

  getErrorMessage(fieldPath: string): string {
    const control = this.dynamicForm.get(fieldPath);
    if (!control) return '';

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('email')) return 'Invalid email format';
    if (control.hasError('minlength')) return 'Minimum length required';
    if (control.hasError('maxlength')) return 'Maximum length exceeded';
    if (control.hasError('pattern')) return 'Invalid format';

    return '';
  }

  submitForm() {
    if (this.dynamicForm.valid) {
      alert('Form submitted successfully!');
    }
  }
}


