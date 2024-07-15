import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    // BoardService 사용하기위한 Dependency Injection
    constructor(private boardService: BoardsService) {}

    // Read 모든게시물 데이터 가져오기
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    // Create 게시글 생성하기
    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    // Read 특정 게시글 데이터 가져오기
    @Get('/:id') // localhost/boards/{id값}
    getBoardById(@Param('id') id: string): Board{
        return this.boardService.getBoardById(id);
    }

}
