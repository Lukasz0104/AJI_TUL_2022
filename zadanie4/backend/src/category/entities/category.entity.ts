import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Category {
    @IsNumber()
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}
