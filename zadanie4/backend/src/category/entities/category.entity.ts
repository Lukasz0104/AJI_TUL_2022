import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Category {
    @IsNumber()
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
