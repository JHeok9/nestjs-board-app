import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

export class UserReopository extends Repository<User> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    // 유저생성
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        const {username, password} = authCredentialsDto;
        const user = this.create({username, password});
        await this.save(user);
    }
    
}