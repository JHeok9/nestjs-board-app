import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    // 전체게시글 불러오기
    getAllBoards(): Board[] {
        return this.boards;
    }

    // 게시글 생성하기
    createBoard(createBoardDto: CreateBoardDto) {
        // const title = createBoardDto.title;
        // const description = createBoardDto.description;
        const {title, description} = createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

}
