import {Injectable, NestMiddleware} from "@nestjs/common";
import * as process from "process";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{

    use(req: any, res: any, next: (error?: any) => void): any {
        console.log("Request Logged " + req.url);
        next();
    }

}
