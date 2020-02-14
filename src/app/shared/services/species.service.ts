import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { RestClientService } from './rest-client.service';

@Injectable()
export class SpeciesService extends RestClientService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getSpecies(): Observable<string[]> {
    return this.http
      .get(this.collectionPath(), this.buildRequestOptions())
      .pipe(
        map((response: HttpResponse<string[]>) => {
          return response.body;
        }),
        catchError(error => this.handleError(error))
      );
  }

  private collectionPath() {
    return `${this.apiUrl}/species`;
  }
}
