import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { AppModule } from "./../src/app.module";
import { AuthDto } from "../src/auth/dto";
import * as pactum from 'pactum';
describe('App e2e', () =>{
    let app : INestApplication
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
        });
        describe('login',()=>{
            it('should login',()=>{
                const dto:AuthDto = {email:"amin1@gmail.com", password:"123456"}
                return pactum.spec().post('/auth/login').withBody(dto).expectStatus(201)
            })
        })
    })
    
});

