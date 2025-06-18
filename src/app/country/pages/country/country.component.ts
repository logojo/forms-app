import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {
 fb = inject( FormBuilder );
 countryService = inject( CountryService );

 regions = signal( this.countryService.regions )

 countries = signal<Country[]>([]);
 borders = signal<Country[]>([]);

 countryForm : FormGroup = this.fb.group({
  region: ['', Validators.required],
  country: ['', Validators.required],
  border: ['', Validators.required],
 });

onFormChanged = effect( ( onCleanup) => {
  const regionSubscription = this.onRegionChange();
  const countrySubscription = this.onCountryChange();

  onCleanup(() => {
    regionSubscription.unsubscribe();
    countrySubscription.unsubscribe();
  });

});


onRegionChange() {
  return this.countryForm.get('region')!.valueChanges
                          .pipe(
                            tap(() => this.countryForm.get('country')!.setValue('')),
                            tap(() => this.countryForm.get('border')!.setValue('')),
                            tap(() => {
                              this.borders.set([]);
                              this.countries.set([]);
                            }),
                            switchMap( region  => this.countryService.countriesByRegios( region) )
                          )
                          .subscribe( countries => this.countries.set(countries))
}

onCountryChange() {
  
  return this.countryForm.get('country')!.valueChanges
              .pipe(
               tap(() => this.countryForm.get('border')!.setValue('')),
               filter(( value) => value.length > 0),
               switchMap( (alphaCode)  => this.countryService.countryByAlphaCode( alphaCode ) ),
               switchMap( ( country )  => this.countryService.countryBorderByCodes( country!.borders ) )
              )
             .subscribe(( countries ) => this.borders.set(countries))
}




}
