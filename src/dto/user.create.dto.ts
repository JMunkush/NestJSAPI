import {IsEmail, IsString, Length, Min} from "class-validator";

export class CreateUserDto {
    @IsString({message: "the email should be string"})
    @IsEmail({}, {message:"invalid email"})
    readonly email: string;

    @Length(4, 28, {message: "the password should be in 4-28"})
    readonly password: string;
}