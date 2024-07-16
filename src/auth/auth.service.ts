import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReopository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserReopository)
        private userRepository: UserReopository,
    ) {}

    
}
