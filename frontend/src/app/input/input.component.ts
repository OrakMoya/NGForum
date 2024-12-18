import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  placeholder = input("");
  type = input("text");
  value = "";
  disabled = false;
  valuechange = output<string>();
  onChange: (value: string) => void = (_) => { };
  onTouched: () => void = () => { };


  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getValue($event: Event): string {
    return ($event.target as HTMLInputElement).value;
  }

}
