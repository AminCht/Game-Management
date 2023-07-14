import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto, UpdateGameDto } from './dto';

@Controller('games')
export class GameController {
    constructor(private gameService: GameService){}
    @Post()
    addGame(@Body() dto: GameDto){
        return this.gameService.addGame(dto);
    }

    @Put(':id')
    updateGame(@Param() param,@Body() dto: UpdateGameDto){
        return this.gameService.updateGame(param, dto);
    }

    @Get('cup/:game')
    getBestGamer(@Param() param){
        return this.gameService.getBestPlayer(param);
    }

}
