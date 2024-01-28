import {RoleService} from "../service/role.service";
import {Body, Controller, Post} from "@nestjs/common";
import {Role} from "../entity/role";

@Controller("/roles")
export class RoleController {

    constructor(private readonly roleService: RoleService) {}


    @Post()
    async create(@Body() body: { name: string }) {
        const { name } = body;

        const roleInstance = new Role();
        roleInstance.name = name;

        await this.roleService.save(roleInstance);

        return name;
    }


}