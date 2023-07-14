import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { GameDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService){}
    async addGame(dto: GameDto){
        try{
            const game = await this.prisma.games.create({
                data:{
                    name: dto.name,
                    profile: { connect: { id:  dto.profile_id} }
                }
            })
            return game;
        }
        catch(error){
            if(error.code ==='P2002'){
                throw new ForbiddenException('این بازی قبلا به این پروفایل اضافه شده است');
            }
            if (error.code === 'P2025'){
                throw new ForbiddenException('پروفایل یافت نشد');
            }
        }
    }

    async getBestPlayer(param){
        const game = await this.prisma.games.findFirst({
            where:{
                name:param.game
            },
            orderBy:{
                cup:'desc'
            },
            include:{
                profile:{
                    include:{
                        user:true
                }
            }
            }
        })
        if(!game){
            throw new NotFoundException('بازی مورد نظر یافت نشد')
        }
        delete game.name
        return game;
    }

    async updateGame(param,dto){
        const game = await this.prisma.games.update({
            where:{
                id:parseInt(param.id)
            },
            data:{
                name:dto.name
            }
        })
        return game
    }


}
