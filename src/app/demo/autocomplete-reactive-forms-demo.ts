import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { FormControl, FormGroup } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-reactive-forms-demo',
    templateUrl: './autocomplete-reactive-forms-demo.html'
})
export class AutocompleteReactiveFormsDemo implements OnInit {
    countries: any[] | undefined;

    formGroup: FormGroup | undefined;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.formGroup = new FormGroup({
            selectedCountry: new FormControl<object | null>(null)
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}