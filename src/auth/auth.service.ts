import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService ){}
    async register(dto: AuthDto){
        try{
        const user =await this.prisma.users.create({
            data: {
                email: dto.email,
                password:dto.password
            }
        });
        await this.prisma.profile.create({
            data: {   
                user: { connect: { id:user.id   } },
            }
        })
        delete user.password;
        return this.signToken(user.id,user.email);
    }catch(error){
        if(error.code === 'P2002'){
            throw new ForbiddenException('این ایمیل متعلق به یک کاربر است');
        }
    }
    
    }

    async login(dto: AuthDto){
        const user = await this.prisma.users.findFirst({
            where:{
                email:dto.email,
                password: dto.password
            }
        })
        if (!user){
            throw new ForbiddenException('نام کاربری یا رمز عبور اشتباه است');
        }
        return this.signToken(user.id,user.email);
    }


    async signToken(id: number, email: string){
        const payload = {id:id, email:email};
        const secret = this.config.get('SECRET_JWT');
        const token = await this.jwt.signAsync(payload,{
            secret:secret
        });
        return {accesstoken: token};
    }


    async googleLogin(req){
        
        const user = await this.prisma.users.findUnique({
            where:{
                email: req.user.email,
            },
            include:{
                profile:true
            }
        })
        if(!user){
        const user = await this.prisma.users.create({
            data: {
                email: req.user.email,
                name: req.user.given_name,
                password: req.user.email
            },
            include:{
                profile:true
            }
        });
        await this.prisma.profile.create({
            data:{
                avatar: req.user.picture,
                user: { connect: { id:user.id } },
            }
        });       
    }
    delete user.password;
    return user;
    
    }
}
