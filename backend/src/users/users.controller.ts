import { Controller, Post, Body, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService, ProfileService } from './users.service';
import { JwtAuthExceptionFilter } from "../common/filters/UrlAccessFilter";
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GamerEmailDto } from "./dto/GamerProfile.dto";

@Controller('home')
@UseFilters(JwtAuthExceptionFilter)
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private readonly profileService: ProfileService,) {}

    @UseGuards(JwtAuthGuard)
    @Post('gamer-profile')
    async gamer_profile(@Body() GamerEmailDTO: GamerEmailDto) {

        return this.profileService.gamerProfileData(GamerEmailDTO.email)

    }

}
