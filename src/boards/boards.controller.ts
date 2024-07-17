import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    // BoardService 사용하기위한 Dependency Injection
    constructor(private boardService: BoardsService) {}

    // Read 모든게시물 데이터 가져오기
    @Get()
    getAllBoard(@GetUser() user: User): Promise <Board[]> {
        return this.boardService.getAllBoards(user);
    }

    // Create 게시글 생성하기
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() creatBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise <Board>{
        return this.boardService.createBoard(creatBoardDto, user);
    }

    // Read 특정 게시글 데이터 가져오기
    @Get('/:id') // localhost/boards/{id값}
    getBoardById(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise <Board>{
        return this.boardService.getBoardById(id, user);
    }

    // Delete 특정 게시글 데이터 지우기
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number):Promise <void>{
        return this.boardService.deleteBoard(id);
    }

    // Update 특정 게시글 업데이트
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        @GetUser() user: User,
    ): Promise <Board> {
        return this.boardService.updateBoardStatus(id, status, user);
    }

}
