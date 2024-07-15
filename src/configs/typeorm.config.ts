import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'nestjs',
    password:'12345',
    database:'nestjs',
    entities:[__dirname + '/../**/*.entity.{js,ts}'],
    synchronize:true
}