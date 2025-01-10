import { logger } from "../common/helpers";
import { BcryptAdapter, JwtAdapter } from "../config";
import { connection } from "../database";
import { CheckUserDto, CreateUserDto } from "./dto";
import { User } from "./entities";

// * ========
function getUserRepository() {
	return connection.getRepository(User);
}
// * ========

export const registerUser = async (createUserDto: CreateUserDto) => {
	try {
		const { password, ...rest } = createUserDto;
		const hash = await BcryptAdapter.encrypt(password);
		const user = getUserRepository().create({
			...rest,
			password: hash,
		});
		await getUserRepository().save(user);

		return createAuthResponse(user);
	} catch (error) {
		logger.error(error);
		return null;
	}
};

export const loginUser = async (checkUserDto: CheckUserDto) => {
	try {
		const { email, password } = checkUserDto;
		const user = await getUserRepository().findOneBy({ email });
		if (!user) throw Error("Credenciales no válidas");
		const validation = await BcryptAdapter.compare(password, user.password);
		if (!validation) throw Error("Credenciales no válidas");
		const token = JwtAdapter.create({ id: user.id });
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
		const user = await getUserRepository().findOneByOrFail({ id });
		return user;
	} catch (error) {
		return null;
	}
};
