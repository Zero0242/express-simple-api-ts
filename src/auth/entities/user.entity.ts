import { Exclude, instanceToPlain } from "class-transformer";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@Column({ unique: true })
	email: string;

	@Exclude({ toPlainOnly: true })
	@Column()
	password: string;

	@Column({ nullable: true })
	avatar: string;

	@Column("text", { array: true, default: ["user"] })
	roles: string[];

	// * ====================================
	// * Serializacion de json
	// * ====================================
	toJson() {
		return instanceToPlain(this);
	}

	// * ====================================
	// * Modificaciones antes de insercion
	// * ====================================
	@BeforeInsert()
	checkFields() {
		this.email = this.email.toLowerCase().trim();
	}
}
