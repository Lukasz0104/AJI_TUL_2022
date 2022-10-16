import { Component } from '@angular/core';
import { FilterParams } from './filter-params';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent
{
    title = 'zadanie3';

    filterParams: FilterParams = new FilterParams();

    paramsChanged(params: FilterParams)
    {
        this.filterParams = Object.assign({}, params);
    }
}
