import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

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
    @UsePipes(ValidationPipe)
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

    // Delete 특정 게시글 데이터 지우기
    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void{
        this.boardService.deleteBoard(id);
    }

    // Update 특정 게시글 업데이트
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Board {
        return this.boardService.updateBoardStatus(id, status);
    }

}
