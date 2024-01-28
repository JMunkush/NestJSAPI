import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entity/product";
import {Repository} from "typeorm";
import {ProductRequest} from "../dto/product.request";
import {Category} from "../entity/category";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
                @InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}


    async create(request: ProductRequest){
        const product = this.productRepository.create(request);
        const category = await this.categoryRepository.findOne({where:{id:request.categoryId}});


        if(!category){
            throw new HttpException('category not found', HttpStatus.BAD_REQUEST);
        } else {
            product.category = category;
            await this.productRepository.save(product);
        }

    }
    async findAll(){
        return this.productRepository.find();
    }
}