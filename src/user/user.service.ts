import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../auth/dto/updateuser.dto';


@Injectable()
export class UserService {
    constructor (private prisma: PrismaService){}

    getMe(req){
        const user = this.prisma.users.findUnique({
            where:{
                id:req.user.id
            },
            include:{
                profile:{
                    include:{
                        game:true
                    }
                }
            }
        })
        return user;
    }


    getUsers(){
        const users = this.prisma.users.findMany({
            include:{
                profile:{
                    include:{
                        game:true,
                },
            },
            },
        })
        return users;
    }

    updateUser(req, dto: UpdateUserDto){
        const user = this.prisma.users.update({
            where:{
                id: req.user.id
            },
            data:{
                email:dto.email,
                name:dto.name,
                password: dto.password
            }
        })
        return user;
    }
}
