import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {CreateUserDto} from "../dto/user.create.dto";
import {ValidationPipe} from "../pipe/validation.pipe";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}