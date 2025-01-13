import fs from "fs";
import path from "path";

export enum Collections {
	avatars = "user-avatars",
}

export function verifyFile(
	collection: Collections,
	fileName: string
): string | undefined {
	const folderpath = path.resolve(__dirname, "..", "..", "static", collection);
	const filepath = path.resolve(folderpath, fileName);
	const exist = fs.existsSync(filepath);
	if (!exist) return undefined;
	return filepath;
}
