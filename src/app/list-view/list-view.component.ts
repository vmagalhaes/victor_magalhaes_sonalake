import { Component } from '@angular/core';

import { CharacterService } from '../shared/services/character.service';

import { Pagination, Column } from '../shared/models/table';
import { Character, CharactersResponse } from '../shared/models/character';
import { Router } from '@angular/router';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html'
})
export class ListViewComponent {

  characters: Character[] = [];
  pagination: Pagination = {
    pages: [],
    _page: 1,
    _limit: 10,
    _sort: 'id',
    _order: 'asc'
  };

  columns: Column[] = [
    { id: 'id', label: 'Id', sort: { _order: 'asc', _sort: 'id' }},
    { id: 'name', label: 'Name', sort: { _order: '', _sort: 'name' }},
    { id: 'species', label: 'Species', sort: { _order: '', _sort: 'species' }},
    { id: 'gender', label: 'Gender', sort: { _order: '', _sort: 'homeworld' }},
    { id: 'homeworld', label: 'Homeworld', sort: { _order: '', _sort: 'homeworld' }},
    { id: 'actions', label: 'Actions' },
  ];

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {
    this.loadCharacters();
  }

  onPageChange(page: number) {
    this.pagination._page = page;
    this.loadCharacters();
  }

  onSearch(value: string) {
    this.loadCharacters(value);
  }

  onRemove(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.characterService
        .delete(id)
        .subscribe(() => {
          this.loadCharacters();
        }, error => {
          alert(error);
          console.warn(error);
        });
    }
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`/character/${id}/edit`);
  }

  onSort(sort: { _order: string, _sort: string }) {
    this.pagination._sort = sort._sort;
    this.pagination._order = sort._order;

    this.loadCharacters();
  }

  private loadCharacters(search?: string) {
    this.characterService
      .getCharacters({
        _page: this.pagination._page,
        _limit: this.pagination._limit,
        _sort: this.pagination._sort,
        _order: this.pagination._order
      }, search)
      .subscribe((response: CharactersResponse) => {
        this.characters = response.characters;

        const value = (parseInt(response.paginationResponse.total, 10) / 10);
        const lastPage = (value % 1) > 0.5 ? Math.trunc(value) + 1 : Math.trunc(value);
        const pages = [...Array(lastPage).keys()].map(number => {
          return { value: number + 1, activated: this.pagination._page === number + 1 };
        });

        this.pagination = { ...{
          pages: pages.length === 0 ? [{ value: 1, activated: true }] : pages,
          _page: this.pagination._page,
          _limit: this.pagination._limit,
          _sort: this.pagination._sort,
          _order: this.pagination._order
        }};
      }, error => {
        alert(error);
        console.warn(error);
      });
  }
}
