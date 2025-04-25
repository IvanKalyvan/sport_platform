import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import { User } from "../users/user.entity";

@Entity()
export class GroundLocationCity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    city!: string;

}

@Entity()
export class GroundLocationCountry {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    country!: string;

}

@Entity()
export class GroundLocation {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GroundLocationCity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "city_id" })
    city!: GroundLocationCity;

    @ManyToOne(() => GroundLocationCountry, { onDelete: "CASCADE" })
    @JoinColumn({ name: "country_id" })
    country!: GroundLocationCountry;

}

@Entity()
export class GroundTypes {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    type_name!: string;

}

@Entity()
export class GroundCredentials {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column("json")
    position!: {
        latitude?: number;
        longitude?: number;
    }

    @ManyToOne(() => GroundTypes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'type' })
    type!: GroundTypes;

    @ManyToOne(() => GroundLocation, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'location' })
    location!: GroundLocation;

}

@Entity()
export class GroundOwner {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    ownerId!: User;

    @ManyToOne(() => GroundCredentials, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ground_id' })
    groundId!: GroundCredentials;

}

@Entity()
export class BookingStatus {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status_type!: string;

}

@Entity()
export class GroundBookingTimeSlots {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('time')
    start_time!: string;

    @Column('time')
    end_time!: string;

}

@Entity()
export class GroundBookingDays {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    day!: number;

}

@Entity()
export class GroundBookingMonths {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    month!: number;

}

@Entity()
export class GroundBookingYears {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    year!: number;

}

@Entity()
export class GroundBooking {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GroundCredentials, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ground_id' })
    ground!: GroundCredentials;

    @ManyToOne(() => GroundBookingTimeSlots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'time_slot_id' })
    timeSlot!: GroundBookingTimeSlots;

    @ManyToOne(() => GroundBookingDays, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'day_id' })
    day!: GroundBookingDays;

    @ManyToOne(() => GroundBookingMonths, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'month_id' })
    month!: GroundBookingMonths;

    @ManyToOne(() => GroundBookingYears, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'year_id' })
    year!: GroundBookingYears;

}

@Entity()
export class GroundTenantBooking {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GroundBookingTimeSlots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ground_booking_slot_id' })
    ground_booking_slot_id!: GroundBookingTimeSlots;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    tenantId!: User;

    @Column('time')
    start_time!: Date;

    @Column('time')
    end_time!: Date;

    @ManyToOne(() => BookingStatus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'status_type' })
    status!: BookingStatus;

}