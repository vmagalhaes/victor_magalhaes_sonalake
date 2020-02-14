import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Character, CharactersResponse } from '../models/character';
import { RestClientService } from './rest-client.service';
import { Pagination } from '../models/table';

@Injectable()
export class CharacterService extends RestClientService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getCharacters(pagination: Pagination, search: string = ''): Observable<CharactersResponse> {
    return this.http
      .get(this.collectionPath(), this.buildRequestOptions({ ...pagination, ...{ q: search }}))
      .pipe(
        map((response: HttpResponse<Character[]>) => {
          return {
            characters: response.body,
            paginationResponse: {
              link: response.headers.get('Link'),
              total: response.headers.get('X-Total-Count')
            }
          };
        }),
        catchError(error => this.handleError(error))
      );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http
      .get(this.elementPath(id.toString()), this.buildRequestOptions())
      .pipe(
        map((response: HttpResponse<Character>) => {
          return response.body;
        }),
        catchError(error => this.handleError(error))
      );
  }

  save(character: Character) {
    return this.http
      .post(this.collectionPath(), character, this.buildRequestOptions())
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  delete(id: number) {
    return this.http
      .delete(this.elementPath(id.toString()), this.buildRequestOptions())
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  edit(id: number, character: Character) {
    return this.http
      .put(this.elementPath(id.toString()), character, this.buildRequestOptions())
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  private collectionPath() {
    return `${this.apiUrl}/characters`;
  }

  private elementPath(id: string = '') {
    return `${this.collectionPath()}/${id}`;
  }
}
