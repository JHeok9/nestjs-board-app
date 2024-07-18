import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserReopository } from "./user.repository";
import { User } from "./user.entity";
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserReopository)
        private userRepository: UserReopository
    ){
        super({
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepository.findOneBy({username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}