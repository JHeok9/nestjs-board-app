import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReopository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'Secret1234', // 아무텍스트나 가능
            signOptions:{
                expiresIn: 60 * 60, // 한시간 유효
            }
        }),
        TypeOrmModule.forFeature([UserReopository])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserReopository, JwtStrategy],
    exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
