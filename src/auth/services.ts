import { logger } from "../common/helpers";
import { BcryptAdapter, JwtAdapter } from "../config";
import { Database } from "../database";
import { CheckUserDto, CreateUserDto } from "./dto";
import { User } from "./entities";

export const registerUser = async (createUserDto: CreateUserDto) => {
	try {
		const repository = Database.of(User);
		const { password, ...rest } = createUserDto;
		const hash = await BcryptAdapter.encrypt(password);
		const user = repository.create({
			...rest,
			password: hash,
		});
		await repository.save(user);

		return createAuthResponse(user);
	} catch (error) {
		logger.error(error);
		return null;
	}
};

export const loginUser = async (checkUserDto: CheckUserDto) => {
	try {
		const repository = Database.of(User);

		const { email, password } = checkUserDto;
		const user = await repository.findOneBy({ email });
		if (!user) throw Error("Credenciales no válidas");
		const validation = await BcryptAdapter.compare(password, user.password);
		if (!validation) throw Error("Credenciales no válidas");
		return createAuthResponse(user);
	} catch (error) {
		logger.error(error);
		return null;
	}
};

export const createAuthResponse = (user: User) => {
	const token = JwtAdapter.create({ id: user.id });
	return { user: user.toJson(), token };
};

export const findUserById = async (id: string) => {
	try {
		const user = await Database.of(User).findOneByOrFail({ id });
		return user;
	} catch (error) {
		return null;
	}
};

export const updateUserAvatar = async (
	user: User,
	file: Express.Multer.File
) => {
	user.avatar = file.filename;
	await Database.of(User).save(user);
	return user.avatar;
};
