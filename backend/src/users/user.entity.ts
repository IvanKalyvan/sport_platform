import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';

@Entity()
export class UserCredentials {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'varchar',nullable: true })
    refreshToken?: string | null;

    @Column({ type: 'varchar', nullable: true })
    confirmToken?: string | null;

    @Column({ nullable: false })
    confirmEmail?: boolean;

    @Column({ type: 'varchar',nullable: true })
    resetPasswordToken?: string | null;

}

@Entity()
export class UserTypes{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    type_name!: string;

}

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => UserCredentials, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'credentials' })
    credentials!: UserCredentials

    @ManyToOne(() => UserTypes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'type' })
    type!: UserTypes

}

@Entity()
export class GamerProfile{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:true})
    name!: string;

    @Column({nullable:true})
    age!: number;

    @Column({nullable:true})
    sex!: string;

    @Column({nullable:true})
    location!: string;

    @Column({nullable:true})
    skill_lvl!: number;

    @Column({nullable:true})
    experience!: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user_id!: User;

}