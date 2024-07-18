import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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

    // 로그 객체 생성
    private logger = new Logger('BoardController')

    // BoardService 사용하기위한 Dependency Injection
    constructor(private boardService: BoardsService) {}

    // Read 모든게시물 데이터 가져오기
    @Get()
    getAllBoard(@GetUser() user: User): Promise <Board[]> {
        // 전체게시글 요청시 로그
        this.logger.verbose(`User ${user.username} trying to get all boards`)
        return this.boardService.getAllBoards(user);
    }

    // Create 게시글 생성하기
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() creatBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise <Board>{
        // 게시글 생성시 로그 
        // JSON으로 넘어온 게시글 데이터 JSON.stringfy 사용해 문자열로 변환하여 로그남기기
        this.logger.verbose(`User ${user.username} creating a new board.
            Payload: ${JSON.stringify(creatBoardDto)}`)
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
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ):Promise <void>{
        return this.boardService.deleteBoard(id, user);
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
