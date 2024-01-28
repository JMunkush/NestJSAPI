import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../entity/product";
import {ProductService} from "../service/product.service";
import {ProductController} from "../controller/product.controller";
import {Category} from "../entity/category";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "./auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
