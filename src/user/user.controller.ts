import {Body, Controller, Get, HttpCode, HttpException, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from '../auth/dto/updateuser.dto';
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    @Get('me')
    @HttpCode(200)
    @UseGuards(AuthGuard(['jwt']))
    getMe(@Req() req: Request){
        return this.userService.getMe(req);
    }

    @Put('me')
   
    @UseGuards(AuthGuard(['jwt']))
    updateUser(@Req() req,@Body() dto:UpdateUserDto){
        return this.userService.updateUser(req,dto);
    }



    @Get()
    getUsers(){
        return this.userService.getUsers();
    }
    
    
}
