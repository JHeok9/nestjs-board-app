import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    // BoardService 사용하기위한 Dependency Injection
    constructor(private boardService: BoardsService) {}

    // Read 모든게시물 데이터 가져오기
    getAllTask(){
        this.boardService
    }
}
