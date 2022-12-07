import { ConflictException, Injectable } from '@nestjs/common';
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
        const foundUser = (
            await this.userRepo.find({
                where: [
                    { username: userData.username },
                    { emailAddress: userData.emailAddress }
                ]
            })
        ).pop();

        if (foundUser?.username === userData.username) {
            throw new ConflictException('This username is already taken.');
        } else if (foundUser?.emailAddress === userData.emailAddress) {
            throw new ConflictException('This email address is already taken.');
        }

        const salt = await bcrypt.genSalt(10);

        const user = new User();
        user.username = userData.username;
        user.emailAddress = userData.emailAddress;
        user.phoneNumber = userData.phoneNumber;
        user.password = await bcrypt.hash(userData.password, salt);

        await this.userRepo.save(user);
    }
}
