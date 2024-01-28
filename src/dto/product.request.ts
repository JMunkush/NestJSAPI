import {IsNumber, IsString, Min} from "class-validator";

export class ProductRequest {
    @IsString({message:"should be string"})
    public name: string;

    @Min(1, {message: "the categoryId should be greater than 0"})
    public categoryId: number;

    @Min(1, {message:"the price should be greater than 0"})
    public price: number;

    constructor(name: string) {
        this.name = name;
    }
}