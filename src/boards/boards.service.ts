import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    // BoardRepository 주입
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    // 전체게시글 불러오기
    async getAllBoards(): Promise <Board[]> {
        return this.boardRepository.find();
    }
    

    // 게시글 생성하기
    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board>{
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // 특정게시글 불러오기
    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOneBy({ id });

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found;
    }

    // 특정게시글 지우기
    async deleteBoard(id: number): Promise <void> {
        const result = await this.boardRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    // 특정게시글 수정
    async updateBoardStatus(id: number, status: BoardStatus): Promise <Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
    

}
