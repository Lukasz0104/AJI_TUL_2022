import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsPhoneNumber,
    IsString
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({
        unique: true
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Column({
        unique: true
    })
    emailAddress: string;

    @IsString()
    @IsPhoneNumber('PL')
    @Column()
    phoneNumber: string;

    @IsEnum(Role)
    @Column({
        default: Role.USER
    })
    role: Role;

    @IsString()
    @Column()
    password: string;
}
