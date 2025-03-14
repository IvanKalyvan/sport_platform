import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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
