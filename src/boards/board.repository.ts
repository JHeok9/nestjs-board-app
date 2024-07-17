import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

/*
TypeORM에서는 EntityReopsitory사용을 비활성화 하였고
Service 레이어에서 비지니스로직과 데이터베이스 로직을 사용하길 권장

EntityRepository 비활성화로 CustomRepsitory 생성 방식은
CustomRepositroy에 Injectable 데코레이터를 작성
TypeORM의 DataSource 주입
module의 providers에 추가해줘야함
*/
@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board);

        return board;
    }

}