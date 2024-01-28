import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: "categories"})
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "name", nullable: false, unique: true})
    name: string

    @Column({name: "image"})
    image: string

    @OneToMany(() => Product, product => product.category,
        {lazy: true, eager:false})
    products: Array<Product>
}