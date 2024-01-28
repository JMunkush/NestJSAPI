import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {UserModule} from "./user.module";
import {AuthService} from "../service/auth.service";
import {AuthController} from "../controller/auth.controller";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [ // Создаем бин JwtService
        JwtModule.register({
            secret: process.env.JWT_SECRET || "SECRET",
            signOptions: {
                expiresIn: "24h",
            }
        }),
        UserModule
    ],
    exports: [JwtModule]
})
export class AuthModule{}