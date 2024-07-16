import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    
}