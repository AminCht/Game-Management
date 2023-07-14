import { Post,Controller, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body() dto:AuthDto){
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto:AuthDto){
        return this.authService.login(dto);
    }

    @Get('google/')
    @UseGuards(AuthGuard('google'))
    googleAuth(@Req() req: Request){
        
    }
    @Get('google/re')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: Request){
        return this.authService.googleLogin(req)
    }

}
