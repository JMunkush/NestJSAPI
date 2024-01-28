import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../entity/category";
import {Repository} from "typeorm";
import {CategoryRequest} from "../dto/category.request";
import {FileService} from "../file/file.service";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
                private readonly fileService: FileService) {}



    async create(request: CategoryRequest, image: any) {
        try {
            const fileName = this.fileService.createFile(image);

            const category = new Category();
            fileName.then(r => {
            category.image = r;
            });
            category.name = request.name;

            await this.categoryRepository.save(category);
        } catch (error) {
            console.error('Error saving category:', error);
            throw error; // Перебросьте ошибку, чтобы она была видна на верхнем уровне, если это необходимо
        }
    }


    async findAll(){
        return await this.categoryRepository.find();
    }


}