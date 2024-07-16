import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReopository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

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

}
