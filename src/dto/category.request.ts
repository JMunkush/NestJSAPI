import {IsString} from "class-validator";

export class CategoryRequest {

    @IsString({message: "should be string"})
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}