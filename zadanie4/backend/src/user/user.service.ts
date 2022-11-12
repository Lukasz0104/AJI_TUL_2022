import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async findByUsername(username: string): Promise<User> {
        return await this.userRepo.findOneBy({ username: username });
    }

    async create(userData: CreateUserDto) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(userData.password, salt);

        const user = new User();
        user.username = userData.username;
        user.emailAddress = userData.emailAddress;
        user.phoneNumber = userData.phoneNumber;
        user.password = hashedPass;

        await this.userRepo.save(user);
    }
}
