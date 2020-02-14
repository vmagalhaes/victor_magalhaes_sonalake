import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { pipe } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sl-search',
  templateUrl: './search.component.html'
})
export class SearchComponent<T> {

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      search: new FormControl()
    });

    this.form
      .get('search')
      .valueChanges
      .pipe(
        debounceTime(200)
      ).subscribe((value: string) => {
        this.searchChange.emit(value);
      });
  }
}
