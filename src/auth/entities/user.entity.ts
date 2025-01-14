import { Exclude, instanceToPlain } from "class-transformer";
import {
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "../../chat";
import { Evento } from "../../events";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text")
	name: string;

	@Column("text")
	lastname: string;

	@Column("text", { unique: true })
	email: string;

	@Exclude({ toPlainOnly: true })
	@Column("text")
	password: string;

	@Column({ nullable: true })
	avatar?: string;

	@Column({ default: false })
	online: boolean;

	@Column("text", { array: true, default: ["user"] })
	roles: string[];

	// * ====================================
	// * Serializacion de json
	// * ====================================
	toJson() {
		if (this.avatar) {
			this.avatar = `/api/uploads/avatars/${this.avatar}`;
		}
		return instanceToPlain(this);
	}

	// * ====================================
	// * Modificaciones antes de insercion
	// * ====================================
	@BeforeInsert()
	checkFields() {
		this.email = this.email.toLowerCase().trim();
	}

	// * ====================================
	// * Relaciones
	// * ====================================
	@OneToMany(() => Evento, (evento) => evento.user)
	events: Event[];

	@OneToMany(() => Message, (message) => message.from)
	receivedMessages: Message[];

	@OneToMany(() => Message, (message) => message.to)
	sentMessages: Message[];
}
