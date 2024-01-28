import {Product} from "../entity/product";

export class ProductResponse {
    constructor(id: number, name: string, price: number, categoryId: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
    }

    public id: number;
    public name: string;
    public price: number;
    public categoryId: number | 0;

    static makeDefault(product: Product): ProductResponse {
        return new ProductResponse(product.id, product.name, product.price, product.category.id);
    }
}
