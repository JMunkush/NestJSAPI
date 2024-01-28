import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/user.create.dto";
import {RoleService} from "./role.service";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly roleService: RoleService) {}

    async findByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}});
    }

    async create(dto: CreateUserDto) {
        const user = this.userRepository.create(dto);
        const role = await this.roleService.findByName("USER");

        // Ensure user.roles is not initialized as an array
        user.roles = [role];

        // Update the user in the database
        await this.userRepository.save(user);

        return user;
    }

}