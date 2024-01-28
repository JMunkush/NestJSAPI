import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../entity/role";
import {RoleService} from "../service/role.service";
import {RoleController} from "../controller/role.controller";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "./auth.module";

@Module({
    controllers: [RoleController],
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleService],
    exports: [RoleService]
})
export class RoleModule {}