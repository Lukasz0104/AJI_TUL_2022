import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { Filters } from '../products-filter/products-filter.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
    private _products: Product[] = [];
    protected filters: Filters = new Filters();

    get products(): Product[] {
        return this.applyFilters();
    }

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        protected authService: AuthService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.productService
            .get()
            .subscribe((products) => (this._products = products));
    }

    protected applyFilters(): Product[] {
        return this._products.filter((p) => {
            if (
                this.filters.name &&
                !p.name
                    .toLocaleLowerCase()
                    .includes(this.filters.name.toLocaleLowerCase())
            ) {
                return false;
            }

            if (
                this.filters.categories.size > 0 &&
                !this.filters.categories.has(p.category.id)
            ) {
                return false;
            }

            return true;
        });
    }

    addToCart(p: Product) {
        this.cartService.addProduct(p.id, p);
    }

    showEditModal(toEdit: Product) {
        const modal = this.modalService.open(EditProductModalComponent, {});
        (modal.componentInstance as EditProductModalComponent).product = toEdit;

        modal.result.then(
            (updated: Product) => {
                if (updated) {
                    const index = this._products.findIndex(
                        (p) => p.id === updated.id
                    );

                    if (index > -1) {
                        this._products[index] = updated;
                    }
                }
            },
            (reason) => reason
        );
    }
}
