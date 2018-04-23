import { HttpClient } from 'aurelia-fetch-client';
import { ApiService } from './../../services/api.service';
import { inject } from 'aurelia-framework';

export class Fetchdata extends ApiService {
    public forecasts: WeatherForecast[];

    activate() {
        this.get<WeatherForecast[]>('SampleData/WeatherForecasts')
            .then(data => this.forecasts = data);
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
