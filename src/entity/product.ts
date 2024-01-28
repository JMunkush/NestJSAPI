import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";

@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Category, category => category.products,
        {createForeignKeyConstraints: true, eager:true})
    @JoinColumn({name: "category_id"})
    category: Category;

}