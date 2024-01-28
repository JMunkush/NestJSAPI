import {HttpException, HttpStatus} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as UUID from "uuid";
import * as process from "process";
export class FileService {

    async createFile(image: any){
        try {
            const fileName = UUID.v4() + ".jpg";
            const currentWorkingDirectory = process.cwd();

            const filePath = path.join(currentWorkingDirectory, "\\static");
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), image.buffer);
            return fileName;
        } catch (e){
            console.log(e)
            throw new HttpException("file error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}