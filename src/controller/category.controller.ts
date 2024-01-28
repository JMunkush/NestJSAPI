import {Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {CategoryRequest} from "../dto/category.request";
import {CategoryService} from "../service/category.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Category} from "../entity/category";
import {LogGuard} from "../guard/log.guard";
import {Roles} from "../decorator/roles.decorator";
import {JwtAuthGuard} from "../guard/jwt.auth.guard";
import {RolesGuard} from "../guard/roles.guard";
import {FileInterceptor} from "@nestjs/platform-express";


@ApiTags("Категорий")
@Controller("/categories")
@UseGuards(LogGuard, JwtAuthGuard, RolesGuard)
export class CategoryController {


    constructor(private readonly categoryService: CategoryService) {}


    @Get()
    @ApiOperation({summary: "Создание пользователя"})
    @ApiResponse({status: 200, type: Array<Category>})
    async fetchAll() {
        return this.categoryService.findAll();
    }


    @Post()
    @UseInterceptors(FileInterceptor("image"))
    async save(@Body() request: CategoryRequest, @UploadedFile() image: any){

        await this.categoryService.create(request, image);

        return `category with name: ${request.name} successfully created`;
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
