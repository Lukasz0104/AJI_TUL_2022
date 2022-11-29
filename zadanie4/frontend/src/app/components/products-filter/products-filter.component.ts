import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';

export class Filters {
    name = '';
    categories: Set<number> = new Set();
}

@Component({
    selector: 'app-products-filter',
    templateUrl: './products-filter.component.html'
})
export class ProductsFilterComponent {
    filters: Filters = new Filters();

    constructor(protected readonly categoryService: CategoryService) {}

    @Output()
    filtersChanged = new EventEmitter<Filters>();

    inputsChanged() {
        this.filtersChanged.emit(this.filters);
    }

    updateCategories(event: Event, id: number) {
        if ((event.target as HTMLInputElement).checked) {
            this.filters.categories.add(id);
        } else {
            this.filters.categories.delete(id);
        }
        this.inputsChanged();
    }
}
