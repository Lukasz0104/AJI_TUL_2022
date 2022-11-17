import { Component } from '@angular/core';
import { FilterParams } from './filter-params';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
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
