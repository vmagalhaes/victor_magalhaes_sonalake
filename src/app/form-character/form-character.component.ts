import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { CharacterService } from '../shared/services/character.service';
import { SpeciesService } from '../shared/services/species.service';

import { Character } from '../shared/models/character';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sl-form-character',
  templateUrl: './form-character.component.html'
})
export class FormCharacterComponent implements OnInit {

  form: FormGroup;

  isLoading = false;
  editMode = false;

  character: Character = {
    id: 0,
    name: '',
    species: [],
    gender: 'male',
    homeworld: ''
  };

  speciesList: Observable<string[]> = new Observable<string[]>();

  constructor(
    private characterService: CharacterService,
    private speciesService: SpeciesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      species: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      homeworld: new FormControl('')
    });

    this.speciesList = this.speciesService.getSpecies();
  }

  ngOnInit() {
    this.route
      .params
      .subscribe((params: any) => {
        // * Name - text input, required
        // * Species - select input, required, options from [/species](http://localhost:3000/species) api
        // * Gender - radio input, required
        //   * value: male, label: Male
        //   * value: female, label: Female
        //   * value: n/a, label: n/a
        // * Homeworld - text input, optional

        if (params.id) {
          this.editMode = true;

          this.characterService
            .getCharacter(params.id)
            .subscribe((character: Character) => {
              this.character = character;

              this.form = this.formBuilder.group({
                name: new FormControl(this.character.name, [Validators.required]),
                species: new FormControl(this.character.species, [Validators.required]),
                gender: new FormControl(this.character.gender, [Validators.required]),
                homeworld: new FormControl(this.character.homeworld)
              });
            }, error => {
              alert(error);
              console.warn(error);
            });
        }
      });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;

      if (this.editMode) {
        this.onEdit();
      } else {
        this.onSave();
      }
    } else {
      this.form.markAllAsTouched();
      const invalidControl = this.elementRef.nativeElement.querySelector('.form-control.ng-invalid');

      if (invalidControl) {
        invalidControl.focus();
      }
    }
  }

  private onSave() {
    this.characterService
      .save(this.getBodyForm())
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(() => {
        this.router.navigateByUrl('/');
      }, error => {
        alert(error.message);
        console.warn(error);
      });
  }

  private onEdit() {
    this.characterService
      .edit(this.character.id, this.getBodyForm())
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(() => {
        this.router.navigateByUrl('/');
      }, error => {
        alert(error.message);
        console.warn(error);
      });
  }

  private getBodyForm() {
    return {
      name: this.form.get('name').value,
      species: this.form.get('species').value,
      gender: this.form.get('gender').value,
      homeworld: this.form.get('homeworld').value
    } as Character;
  }
}
