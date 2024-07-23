import { BoardRepository } from "./board.repository";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
//import { AuthModule } from "src/auth/auth.module";

describe('boardController', () => {
  let boardsController: BoardsController;
  let boardsService: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: 'localhost',
          port: 3306,
          username: 'nestjs',
          password: '12345',
          database: 'nestjs',
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize: true
        }),
        //TypeOrmModule.forFeature([BoardRepository]),
        //AuthModule,
      ],
      controllers: [BoardsController],
      providers: [BoardsService,BoardRepository],
    }).compile();

    boardsService = module.get<BoardsService>(BoardsService);
    boardsController = module.get<BoardsController>(BoardsController);
  });
  
  it('should be defined', () => {
    expect(boardsController).toBeDefined();
  });

  
});