import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService){}
    getProfile(req){
        const profile = this.prisma.profile.findUnique({
            where:{
                user_id:req.user.profile.user_id
            },
            include:{
                game:true
            }
        })
        return profile;
    }
    updateProfile(req,dto){
        console.log(req.user)
        const profile = this.prisma.profile.update({
            where:{
                user_id:req.user.profile.user_id
            },
            data:{
                avatar:dto.avatar,
                level: dto.level
            },
            include:{
                game:true
            }
        })
        return profile;
    }
}
