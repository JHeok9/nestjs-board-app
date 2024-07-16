import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    // BoardRepository 주입
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    // 전체게시글 불러오기
    

    // 게시글 생성하기
    async createBoard(createBoardDto: CreateBoardDto): Promise <Board>{
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);

        return board;
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
    

    // 특정게시글 수정
    

}
