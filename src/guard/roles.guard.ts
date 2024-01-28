import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorator/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService,
                private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride( // пытаемся получить @Roles("USER") -> "USER"
                ROLES_KEY,[ // по ключу извлекаем какой декоратор @?
                context.getHandler(), // текущая функия (функции контроллера, @Get...)
                context.getClass()] // текущий класс
            );

            if(!requiredRoles){
                return true;
            }
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];

            if(bearer !== "Bearer" || !token){
                throw new UnauthorizedException({message: "Пользователь не авторизован"})
            }


            const user = this.jwtService.verify(token);
            const roles = user.roles.map(r => r.name);
            request.user = user;

            return roles.some(role => requiredRoles.includes(role));
        } catch (e){
            throw new UnauthorizedException({message: "нет доступа"})
        }
        return false;
    }

}