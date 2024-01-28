import {Body, Controller, Get, Param, Post, Query, Req} from "@nestjs/common";
import {ProductService} from "../service/product.service";
import {ProductRequest} from "../dto/product.request";
import {ApiResponse} from "../dto/api.response";
import {ProductResponse} from "../dto/product.response";
import {ApiTags} from "@nestjs/swagger";
import {Roles} from "../decorator/roles.decorator";


@ApiTags("Продукты")
@Controller("/products")
export class ProductController {

    private readonly productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }


    @Get()
    async fetchAll() {
        return (await this.productService.findAll())
            .map(product => ProductResponse.makeDefault(product));
    }


    @Post()
    @Roles("ADMIN")
    async save(@Body() request: ProductRequest){

        await this.productService.create(request);

        return ApiResponse.ok(`product with name ${request.name} successfully created`)
    }

    @Get("/getByName")
    async findByName(@Query("name") name: string){

        console.log(name);

        return "requestParam";
    }

    @Get("/:id") // pathVariable
    async fetchOne(@Param("id") id: string){

        return "pathVariable";
    }



}
