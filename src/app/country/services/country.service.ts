import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = environment.apiUrl;
  private http = inject( HttpClient );

  #regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  get regions() {
    return [ ...this.#regions ];
  }

  countriesByRegios( region: string) : Observable<Country[]>{
    if(!region) return of([]);

    return this.http.get<Country[]>(`${this.baseUrl}/${region}?fields=cca3,name,borders`);
  }

  countryByAlphaCode(alphaCode: string) : Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`);
  } 

  countryBorderByCodes( borders: string[] ) {
    //todo: por hacer
  }
}
