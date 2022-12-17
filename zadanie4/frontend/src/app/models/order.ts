import { Product } from './product';

export interface OrderDetails {
    id: number;
    product: Product;
    quantity: number;
}

export interface Order {
    id: number;
    acceptDate: Date;
    status: string;
    username: string;
    emailAddress: string;
    phoneNumber: string;
    products?: OrderDetails;
}
