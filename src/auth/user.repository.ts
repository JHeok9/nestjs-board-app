import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserReopository extends Repository<User> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    // 유저생성
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User();
        user.username = username;
        user.password = hashedPassword;

        try {
            await user.save();
        } catch (error) {
            console.log(error);
            if(error.code === 'ER_DUP_ENTRY'){ // 중복일시 에러코드
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
    
}