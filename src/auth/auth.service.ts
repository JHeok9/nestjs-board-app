import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReopository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserReopository)
        private userRepository: UserReopository,
    ) {}

    // 유저 회원가입
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    // 유저 로그인
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise <String> {
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            return 'logIn success'
        } else {
            throw new UnauthorizedException('logIn failed')
        }
    }

}
