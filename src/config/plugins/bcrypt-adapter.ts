import * as bcrypt from "bcryptjs";

export class BcryptAdapter {
	static async encrypt(payload: string): Promise<string> {
		return await bcrypt.hash(payload, 10);
	}

	static async compare(payload: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(payload, hash);
	}
}
