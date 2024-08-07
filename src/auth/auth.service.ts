import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReopository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserReopository)
        private userRepository: UserReopository,
        private jwtService: JwtService
    ) {}

    // 유저 회원가입
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    // 유저 로그인
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise <{accessToken: string}> {
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            // 유저 토큰 생성( Secret + Payload )
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else {
            throw new UnauthorizedException('logIn failed')
        }
    }

}
