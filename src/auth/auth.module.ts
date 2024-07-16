import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReopository } from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserReopository])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserReopository]
})
export class AuthModule {}
