import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entity/user";
import {UserService} from "../service/user.service";
import {RoleModule} from "./role.module";
import {Role} from "../entity/role";
import {RoleService} from "../service/role.service";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "./auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), RoleModule],
    providers: [UserService],
    exports: [UserService] // Модуль который импортирует
    // этот модуль, ему будет доставлен бин UserService,
    // чтобы он заинжектовал в своих providers (бинах)
})
export class UserModule {}