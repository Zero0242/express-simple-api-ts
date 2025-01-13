import { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

interface Options {
	destination: string;
	fieldname: string;
	fileType?: FileType;
}

export enum FileType {
	IMAGE = "image",
	VIDEO = "video",
	DOCUMENT = "document",
	OTHER = "other",
}

const fileFilter = (fileType?: FileType) => {
	return (req: Express.Request, file: Express.Multer.File, cb: any) => {
		if (!fileType) return cb(null, true);

		const mimeTypes: { [key in FileType]: string[] } = {
			[FileType.IMAGE]: ["image/jpeg", "image/png", "image/gif"],
			[FileType.VIDEO]: ["video/mp4", "video/mpeg", "video/quicktime"],
			[FileType.DOCUMENT]: [
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			],
			[FileType.OTHER]: [],
		};

		if (mimeTypes[fileType].includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("Invalid file type"), false);
		}
	};
};

export function UploadMiddleware({
	destination,
	fieldname,
	fileType,
}: Options): RequestHandler {
	const storage = multer.diskStorage({
		destination: destination,
		filename: (req, file, cb) => {
			const ext = path.extname(file.originalname);
			const filename = uuid() + ext;
			cb(null, filename);
		},
	});

	const upload = multer({
		storage,
		limits: {
			fileSize: 10 * 1024 * 1024,
		},
		fileFilter: fileFilter(fileType),
	});
	return upload.single(fieldname) as unknown as RequestHandler;
}
