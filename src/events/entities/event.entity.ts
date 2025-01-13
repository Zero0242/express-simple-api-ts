import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth";

@Entity()
export class Evento {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text")
	title: string;

	@Column("text")
	notes: string;

	@Column("date")
	start: Date;

	@Column("date")
	end: Date;

	// * ======================
	// * Relaciones
	// * ======================
	@ManyToOne(() => User, (user) => user.events)
	user: User;
}
