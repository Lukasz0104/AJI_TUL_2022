export class Product {
    id: number;

    name: string;

    description: string;

    unitPrice: number;

    unitWeight: number;

    constructor(
        name: string,
        description: string,
        unitPrice: number,
        unitWeight: number
    ) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.unitWeight = unitWeight;
    }
}
