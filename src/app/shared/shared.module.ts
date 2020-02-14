import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from './components/table/table.component';
import { SearchComponent } from './components/search/search.component';

import { CharacterService } from './services/character.service';
import { SpeciesService } from './services/species.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchComponent,
    TableComponent
  ],
  exports: [
    SearchComponent,
    TableComponent
  ],
  providers: [
    CharacterService,
    SpeciesService
  ],
})
export class SharedModule { }
