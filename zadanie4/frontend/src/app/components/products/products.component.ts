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
    products: Product[] = [];

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        protected authService: AuthService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.productService
            .get()
            .subscribe((products) => (this.products = products));
    }

    filterProducts(filters: Filters) {
        // TODO add filtering logic
    }

    addToCart(p: Product) {
        this.cartService.addProduct(p.id, p);
    }

    showEditModal(productToEdit: Product) {
        const editModal = this.modalService.open(EditProductModalComponent, {});
        (editModal.componentInstance as EditProductModalComponent).product =
            productToEdit;

        editModal.result.then(
            (updated: Product) => {
                if (updated) {
                    const index = this.products.findIndex(
                        (p) => p.id === updated.id
                    );

                    if (index > -1) {
                        this.products[index] = updated;
                    }
                }
            },
            (reason) => reason
        );
    }
}
