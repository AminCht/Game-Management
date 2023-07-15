import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { AppModule } from "./../src/app.module";
import { AuthDto } from "../src/auth/dto";
import * as pactum from 'pactum';
import { PrismaService } from "../src/prisma/prisma.service";
describe('App e2e', () =>{
    let app : INestApplication
    let prisma: PrismaService
    beforeAll(async ()=>{
        const moduleRef =await Test.createTestingModule({
            imports: [AppModule],
        }).compile()
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
        whitelist:true
    }))
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333');
    
    })
    afterAll(()=>{
        app.close()
    })
    describe('Auth',()=>{
        describe('Register',()=>{
            it('should register', ()=>{
                const dto:AuthDto = {email:"amin@gmail.com", password:"123456"}
                return pactum.spec().post('/auth/register').withBody(dto).expectStatus(201)
            });
            it('insert bad format for email',()=>{
                const dto:AuthDto = {email:"amingmail.com", password:"123456"}
                return pactum.spec().post('/auth/register').withBody(dto).expectStatus(400)
            })
        });
        describe('login',()=>{
            it('shouldnt login wrong information',()=>{
                const dto:AuthDto = {email:"amin1@gmail.com", password:"123456"}
                return pactum.spec().post('/auth/login').withBody(dto).expectStatus(403)
            });
            it('should login',()=>{
                const dto:AuthDto = {email:"amin@gmail.com", password:"123456"}
                return pactum.spec().post('/auth/login').withBody(dto).expectStatus(200).stores('userAt', 'accesstoken')
            })
        })
    })
describe('users',()=>{
    describe('getMe',()=>{
        it('get current user',()=>{
            return pactum.spec().get('/users/me').withHeaders({
                Authorization: 'Bearer $S{userAt}'
            }).expectStatus(200)
        })
    })
})
    
});

