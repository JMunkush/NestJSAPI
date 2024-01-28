import { Module } from '@nestjs/common';
import {CategoryController} from '../controller/category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "../entity/category";
import {CategoryService} from "../service/category.service";
import {AuthModule} from "./auth.module";
import {FileModule} from "../file/file.module";

@Module({
    imports: [TypeOrmModule.forFeature([Category]), AuthModule, FileModule],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
