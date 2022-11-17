import { Component, EventEmitter, Output } from '@angular/core';
import { FilterParams } from 'src/app/filter-params';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent
{
    @Output()
    filterParamChange = new EventEmitter<FilterParams>();

    params: FilterParams = new FilterParams();

    constructor() { }

    emit()
    {
        this.filterParamChange.emit(this.params);
    }
}
