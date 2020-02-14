import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class RestClientService {

  authToken: string;
  apiUrl = 'http://localhost:3000';

  constructor(
  ) { }

  buildRequestOptions(queryParams: any = {}) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');

    const params = this.buildSearchParams(queryParams);

    return { headers, params, observe: 'response' as const };
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

  private buildSearchParams(queryParams: { [key: string]: any }) {
    const params = {};

    for (const key of Object.keys(queryParams)) {
      const value = queryParams[key];

      if (Array.isArray(value)) {
        value.forEach((v: string) => {
          params[`${key}[]`] = v;
        });
      } else {
        params[`${key}`] = value;
      }
    }

    return params;
  }
}
