import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {DeepPartial, In, Repository} from 'typeorm';
import { GroundTypes, GroundCredentials, GroundOwner, GroundLocation, GroundLocationCity, GroundLocationCountry,
GroundBooking, GroundTenantBooking, GroundBookingTimeSlots, BookingStatus, GroundBookingDays, GroundBookingMonths,
GroundBookingYears} from "./ground.entity";
import { User, UserCredentials } from "../users/user.entity"
import {formatMarkedDates, formatTime} from "./ground.utils";

// noinspection TypeScriptValidateTypes
@Injectable()
export class GroundService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserCredentials)
        private userCredentialsRepository: Repository<UserCredentials>,
        @InjectRepository(GroundTypes)
        private groundTypesRepository: Repository<GroundTypes>,
        @InjectRepository(GroundOwner)
        private groundOwnerRepository: Repository<GroundOwner>,
        @InjectRepository(GroundCredentials)
        private groundCredentialsRepository: Repository<GroundCredentials>,
        @InjectRepository(GroundLocation)
        private groundLocationRepository: Repository<GroundLocation>,
        @InjectRepository(GroundLocationCity)
        private groundCityRepository: Repository<GroundLocationCity>,
        @InjectRepository(GroundLocationCountry)
        private groundCountryRepository: Repository<GroundLocationCountry>,
        @InjectRepository(GroundBooking)
        private groundBookingRepository: Repository<GroundBooking>,
        @InjectRepository(GroundBookingTimeSlots)
        private groundBookingTypeSlotsRepository: Repository<GroundBookingTimeSlots>,
        @InjectRepository(GroundBookingDays)
        private groundBookingDaysRepository: Repository<GroundBookingDays>,
        @InjectRepository(GroundBookingMonths)
        private groundBookingMonthsRepository: Repository<GroundBookingMonths>,
        @InjectRepository(GroundBookingYears)
        private groundBookingYearsRepository: Repository<GroundBookingYears>,
        @InjectRepository(GroundTenantBooking)
        private groundTenantBookingRepository: Repository<GroundTenantBooking>,
        @InjectRepository(BookingStatus)
        private bookingStatusRepository: Repository<BookingStatus>,
    ) {}

    async createGround(email: string, title: string, position: any, type: string) {

        let city = await this.groundCityRepository.findOne({
            where: { city: position.city },
        })

        if (!city) {

            city = await this.groundCityRepository.create({
                city: position.city,
            })
            await this.groundCityRepository.save(city)

        }

        let country = await this.groundCountryRepository.findOne({
            where: { country: position.country },
        })

        if (!country) {

            country = await this.groundCountryRepository.create({
                country: position.country,
            })
            await this.groundCountryRepository.save(country)

        }

        let groundLocation = await this.groundLocationRepository.findOne({
            where: { city: city, country: country },
        })

        if (!groundLocation) {

            groundLocation = await this.groundLocationRepository.create({
                city: city,
                country: country,
            })
            await this.groundLocationRepository.save(groundLocation)

        }

        const groundType = await this.groundTypesRepository.findOne({
            where: { type_name: type },
        })

        if (!groundType) {
            return { success: false, message: 'No such ground type' };
        }

        const userCredentials = await this.userCredentialsRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password']
        });

        if (!userCredentials) {
            return { success: false, message: 'No user with this email' };
        }

        const user = await this.userRepository.findOne({
            where: { credentials: userCredentials },
        })

        if (!user) {

            return { success: false, message: 'No user' };

        }

        const latitude = position.location.latitude;
        const longitude = position.location.longitude;

        const newGround = this.groundCredentialsRepository.create({
            title: title,
            position: { latitude, longitude },
            location: groundLocation,
            type: groundType,
        })

        await this.groundCredentialsRepository.save(newGround);

        const newUserGround = this.groundOwnerRepository.create({
            ownerId: user,
            groundId: newGround
        })

        await this.groundOwnerRepository.save(newUserGround);

        return { success: true, message: 'Successfully created!' };

    }

    async getGroundTypes() {

        const groundTypes = await this.groundTypesRepository.createQueryBuilder("GroundTypes").select("GroundTypes.type_name").getRawMany();

        return groundTypes.map(role => role.GroundTypes_type_name);

    }

    async getCurrentGroundTypes(email: string, offset: number = 0) {

        const userCredentials = await this.userCredentialsRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password']
        });

        if (!userCredentials) {
            return { success: false, message: 'No user with this email' };
        }

        const user = await this.userRepository.findOne({
            where: { credentials: userCredentials },
            relations: ['type'],
        })

        if (!user) {

            return { success: false, message: 'No user' };

        }
        const ground = await this.groundOwnerRepository.createQueryBuilder('ground')
            .select('ground.ground_id', 'groundId')
            .where('ground.user_id = :user_id', { user_id: user.id })
            .getRawMany();

        if (ground) {
            const groundIds = ground.map(g => g.groundId);

            const groundParams = await this.groundCredentialsRepository.find({
                where: { id: In(groundIds)},
                select: ["id", "title", "position"],
                relations: ["type", "location"],
                take: 3,
                skip: offset
            });

            return {
                success: true,
                data: groundParams,
                message: 'Ground types retrieved successfully'
            };

        }

        return { success: false, message: 'No grounds found' };

    }

    async deleteGround(id: number) {

        const ground = await this.groundCredentialsRepository.findOne({where: { id: id }});

        if (!ground) {

            return { success: false, message: 'No grounds found' };

        }

        const groundOwnerID = await this.groundOwnerRepository.findOne({
            where: { groundId: { id: ground.id }},
        })

        if (!groundOwnerID) {

            return { success: false, message: 'Ground owner not found' };

        }

        await this.groundOwnerRepository.delete(groundOwnerID)
        await this.groundCredentialsRepository.delete(id)

    }

    async updateGround(id: number, email: string, title?: string, position?: any, type?: string) {

        const userCredentials = await this.userCredentialsRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password'],
        });

        if (!userCredentials) {
            return { success: false, message: 'No user with this email' };
        }

        const user = await this.userRepository.findOne({
            where: { credentials: userCredentials },
        });

        if (!user) {
            return { success: false, message: 'No user found' };
        }

        const existingGround = await this.groundCredentialsRepository.findOne({
            where: { id },
        });

        if (!existingGround) {
            return { success: false, message: 'Ground not found' };
        }

        const userGround = await this.groundOwnerRepository.findOne({
            where: { ownerId: user, groundId: { id: existingGround.id } },
        });

        if (!userGround) {
            return { success: false, message: 'User does not own this ground' };
        }

        if (title) {
            existingGround.title = title;
        }

        if (type) {
            const groundType = await this.groundTypesRepository.findOne({
                where: { type_name: type },
            });

            if (!groundType) {
                return { success: false, message: 'No such ground type' };
            }

            existingGround.type = groundType;
        }

        if (position) {

            let city = await this.groundCityRepository.findOne({
                where: { city: position.city },
            });

            if (!city) {
                city = this.groundCityRepository.create({ city: position.city });
                await this.groundCityRepository.save(city);
            }

            let country = await this.groundCountryRepository.findOne({
                where: { country: position.country },
            });

            if (!country) {
                country = this.groundCountryRepository.create({ country: position.country });
                await this.groundCountryRepository.save(country);
            }

            let groundLocation = await this.groundLocationRepository.findOne({
                where: { city, country },
            });

            if (!groundLocation) {
                groundLocation = this.groundLocationRepository.create({ city, country });
                await this.groundLocationRepository.save(groundLocation);
            }

            existingGround.position = {
                latitude: position.location.latitude,
                longitude: position.location.longitude,
            };
            existingGround.location = groundLocation;
        }

        await this.groundCredentialsRepository.save(existingGround);

        return { success: true, message: 'Successfully updated ground!' };
    }

    async createBooking(groundID: number, start_date: Date, end_date: Date) {
        let ground = await this.groundCredentialsRepository.findOne({
            where: { id: groundID },
            relations: ["type", "location"]
        });

        let start_time;
        let end_time;
        let timeSlot;
        start_time = formatTime(start_date);
        end_time = formatTime(end_date);

        if (!ground) {
            throw new Error('Ground not found');
        }

        if (ground.type.type_name === 'Gridiron') {
            const date = new Date(start_date);
            const default_start_time = new Date(date.setHours(0, 0, 0, 0)).toLocaleTimeString('en-GB');
            const default_end_time = new Date(date.setHours(23, 59, 59, 999)).toLocaleTimeString('en-GB');

            timeSlot = await this.groundBookingTypeSlotsRepository.findOne({
                where: { start_time: default_start_time, end_time: default_end_time }
            });

            if (!timeSlot) {
                timeSlot = this.groundBookingTypeSlotsRepository.create({
                    start_time: default_start_time,
                    end_time: default_end_time
                });
                await this.groundBookingTypeSlotsRepository.save(timeSlot);
            }

        } else {

            timeSlot = await this.groundBookingTypeSlotsRepository.findOne({
                where: { start_time: start_time.time, end_time: end_time.time }
            });

            if (!timeSlot) {
                timeSlot = this.groundBookingTypeSlotsRepository.create({
                    start_time: start_time.time,
                    end_time: end_time.time
                });
                await this.groundBookingTypeSlotsRepository.save(timeSlot);
            }
        }

        let day = await this.groundBookingDaysRepository.findOne({
            where: { day: start_time.day },
        });

        if (!day) {
            day = this.groundBookingDaysRepository.create({ day: start_time.day });
            await this.groundBookingDaysRepository.save(day);
        }

        let month = await this.groundBookingMonthsRepository.findOne({
            where: { month: start_time.month },
        });

        if (!month) {
            month = this.groundBookingMonthsRepository.create({ month: start_time.month });
            await this.groundBookingMonthsRepository.save(month);
        }

        let year = await this.groundBookingYearsRepository.findOne({
            where: { year: start_time.year },
        });

        if (!year) {
            year = this.groundBookingYearsRepository.create({ year: start_time.year });
            await this.groundBookingYearsRepository.save(year);
        }

        const booking = await this.groundBookingRepository.findOne({
            where: {
                day: day,
                month: month,
                year: year
            },
        })

        if (!booking){
            const booking = this.groundBookingRepository.create({
                ground,
                timeSlot,
                day,
                month,
                year
            } as DeepPartial<GroundBooking>);

            await this.groundBookingRepository.save(booking);
        }

        return booking;
    }

    async getMarkedDates(groundId: number, year: number, month: number) {

        const ground = await this.groundCredentialsRepository.findOne({

            where: { id: groundId },

        })

        if (!ground){

            return{ success: false, message: 'No such ground!' };

        }

        const groundBooking = await this.groundBookingRepository.find({

            where: {
                ground: { id: ground.id },
                year: { year: year },
                month: { month: month },
            },
            relations: ["timeSlot", "day", "month", "year"]

        })

        const markedDates = formatMarkedDates(groundBooking)

        return {
            success: true,
            markedDates: [...new Set(markedDates)]
        };

    }

}