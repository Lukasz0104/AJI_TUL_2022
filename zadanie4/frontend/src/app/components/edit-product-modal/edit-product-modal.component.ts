import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { UpdateProductDto } from '../../models/update-product-dto';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product-modal.component.html'
})
export class EditProductModalComponent {
    protected categories$ = new BehaviorSubject<Category[]>([]);

    protected dto: UpdateProductDto = {};

    private _product: Product | null = null;

    set product(p: Product) {
        this._product = p;

        this.dto = {
            name: p.name,
            description: p.description,
            unitPrice: p.unitPrice,
            unitWeight: p.unitWeight,
            categoryId: p.category.id
        };
    }

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        public activeModal: NgbActiveModal
    ) {
        this.categoryService.categories$.subscribe((categories) => {
            this.categories$.next(categories);
        });
    }

    onSubmit() {
        if (this._product) {
            this.productService
                .update(this._product.id, this.dto)
                .subscribe((updated) => {
                    console.log(updated);

                    this.activeModal.close(updated);
                });
        }
    }
}
