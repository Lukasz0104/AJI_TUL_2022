import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { UpdateProductDto } from '../../models/update-product-dto';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

export type UpdateProductErros = {
    [Property in keyof UpdateProductDto]: string | undefined;
};

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product-modal.component.html'
})
export class EditProductModalComponent {
    protected categories$ = new BehaviorSubject<Category[]>([]);

    protected dto: UpdateProductDto = {};

    protected errors: UpdateProductErros = {};

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
                .pipe(
                    catchError((e, _) => {
                        for (const message of e.error.message as string[]) {
                            const splitted = message.split(' ');
                            switch (splitted[0]) {
                                case 'unitPrice':
                                    this.errors.unitPrice =
                                        'Price ' + splitted.slice(1).join(' ');
                                    break;
                                case 'unitWeight':
                                    this.errors.unitWeight =
                                        'Weight ' + splitted.slice(1).join(' ');
                                    break;
                            }
                        }

                        return EMPTY;
                    })
                )
                .subscribe((updated) => {
                    this.activeModal.close(updated);
                });
        }
    }
}
