import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "./user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../entity/user";
import {CreateUserDto} from "../dto/user.create.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService ) {}



    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }
    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.findByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const dbUserDto = {...userDto, password: hashPassword}; // userDto.setPassword(hashPassword);
        const user = await this.userService.create(dbUserDto);
        return this.generateToken(user);
    }
    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.findByEmail(userDto.email);
        if(!user) {
            throw new BadRequestException({message: "Пользователь не существует"})
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
