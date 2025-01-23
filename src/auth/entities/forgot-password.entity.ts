import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("forgot_password")
export class ForgotPassword {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	code: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ type: "timestamp" })
	expiresAt: Date;

	@ManyToOne(() => User, (user) => user.forgotPasswords, { eager: true })
	user: User;

	get isExpired(): boolean {
		return new Date() > this.expiresAt;
	}
}
