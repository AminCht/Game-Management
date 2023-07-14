import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto';

@Controller('users/me/profile')
export class ProfileController {
    constructor(private profileService: ProfileService){}

    @Get('')
    @UseGuards(AuthGuard(['jwt']))
    getProfile(@Req() req){
        return this.profileService.getProfile(req);
    }

    @Put('')
    @UseGuards(AuthGuard(['jwt']))
    updateProfile(@Req() req, @Body() dto: UpdateProfileDto){
        return this.profileService.updateProfile(req,dto)
    }
}
