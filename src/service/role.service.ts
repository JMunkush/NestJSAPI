import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "../entity/role";
import {Repository} from "typeorm";

export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}


    async findByName(name: string){
       return await this.roleRepository.findOne({where: {name: name}});

    }

    async save(role: Role){
        await this.roleRepository.save(role);
    }
}