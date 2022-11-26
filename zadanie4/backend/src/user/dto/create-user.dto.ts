import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @IsPhoneNumber('PL')
    phoneNumber: string;
}
