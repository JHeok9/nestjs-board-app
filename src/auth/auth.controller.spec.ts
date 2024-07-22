import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        signUp: jest.fn().mockResolvedValue(undefined),
        signIn: jest.fn().mockResolvedValue({ accessToken: 'testToken' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('signUp', () => {
        it('should sign up a user', async () => {
            const authCredentialsDto: AuthCredentialsDto = { username: 'test', password: 'test' };
            await expect(authController.signUp(authCredentialsDto)).resolves.not.toThrow();
            expect(authService.signUp).toHaveBeenCalledWith(authCredentialsDto);
        });
    });

    describe('signIn', () => {
        it('should sign in a user and return an access token', async () => {
            const authCredentialsDto: AuthCredentialsDto = { username: 'test', password: 'test' };
            await expect(authController.signIn(authCredentialsDto)).resolves.toEqual({ accessToken: 'testToken' });
            expect(authService.signIn).toHaveBeenCalledWith(authCredentialsDto);
        });
    });

})