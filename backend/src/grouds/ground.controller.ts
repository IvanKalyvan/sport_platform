import { Controller, UseFilters, UseGuards, Post, Body, Get, Query, Delete, Patch } from "@nestjs/common";
import { JwtAuthExceptionFilter } from "../common/filters/UrlAccessFilter";
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateGroundDto } from "./dto/GroundInfo.dto";
import { CurrentGroundTypesDto } from "./dto/CurrentUserGrounds.dto"
import { UpdateGroundDto } from "./dto/GroundUpdate.dto";
import { DeleteGroundDto } from "./dto/DeleteGround.dto";
import { GroundService } from "./ground.service";
import { CreateBookingDto } from "./dto/CreateBooking.dto";
import { MarkedDatesDto } from "./dto/MarkedDates.dto";

@Controller("ground")
@UseGuards(JwtAuthGuard)
@UseFilters(JwtAuthExceptionFilter)
export class GroundController {

    constructor(private readonly groundService: GroundService) {}

    @Post("create-ground")
    async create_ground(@Body() CreateGroundDTO: CreateGroundDto){

        return this.groundService.createGround(CreateGroundDTO.user_email, CreateGroundDTO.ground_title, CreateGroundDTO.position, CreateGroundDTO.type);

    }

    @Get("ground-types")
    async get_ground_types() {

        return this.groundService.getGroundTypes()

    }

    @Get("current-user-grounds")
    async get_current_ground_types(@Query() CurrentGroundTypesDTO: CurrentGroundTypesDto) {

        return this.groundService.getCurrentGroundTypes(CurrentGroundTypesDTO.email, CurrentGroundTypesDTO.offset)

    }

    @Patch("update-ground")
    async update_ground(@Body() UpdateGroundDTO: UpdateGroundDto) {

        return this.groundService.updateGround(UpdateGroundDTO.id, UpdateGroundDTO.user_email, UpdateGroundDTO.ground_title, UpdateGroundDTO.position, UpdateGroundDTO.type)

    }

    @Delete("delete-ground")
    async delete_ground(@Query() DeleteGroundDTO: DeleteGroundDto) {

        return this.groundService.deleteGround(Number(DeleteGroundDTO.id))

    }

    @Post("create-booking")
    async create_booking(@Body() CreateBookingDTO: CreateBookingDto) {

        return this.groundService.createBooking(CreateBookingDTO.groundId, CreateBookingDTO.start_time, CreateBookingDTO.end_time)

    }

    @Get("marked-dates")
    async get_marked_dates(@Query() MarkedDatesDTO: MarkedDatesDto) {

        return this.groundService.getMarkedDates(MarkedDatesDTO.objectId, MarkedDatesDTO.year, MarkedDatesDTO.month)

    }

}