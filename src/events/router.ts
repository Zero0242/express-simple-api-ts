import express from "express";
import { AuthMiddleware } from "../auth/middleware";
import { PaginationDTO } from "../common/dto";
import { logger } from "../common/helpers";
import { ValidationMiddleware } from "../common/middleware";
import { CreateEventDto, UpdateEventDto } from "./dto";
import * as EventService from "./service";

const router = express.Router();

router.get(
	"/events",
	AuthMiddleware(),
	ValidationMiddleware(PaginationDTO, "query"),
	async function (req, res) {
		try {
			const events = await EventService.findAll({ limit: 10, offset: 0 });
			return res.status(200).json(events);
		} catch (error) {
			logger.error(error);
			return res.status(500).json({ message: "Error fetching events", error });
		}
	}
);

router.get("/events/:id", AuthMiddleware(), async function (req, res) {
	try {
		const event = await EventService.findOne(req.params.id);
		if (event) {
			return res.status(200).json(event);
		} else {
			return res.status(404).json({ message: "Event not found" });
		}
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ message: "Error fetching event", error });
	}
});

router.post(
	"/events",
	AuthMiddleware(),
	ValidationMiddleware(CreateEventDto),
	async function (req, res) {
		try {
			// @ts-ignore
			const newEvent = await EventService.create(req.body, req.user);
			return res.status(201).json(newEvent);
		} catch (error) {
			logger.error(error);
			return res.status(500).json({ message: "Error creating event", error });
		}
	}
);

router.patch(
	"/events/:id",
	AuthMiddleware(),
	ValidationMiddleware(UpdateEventDto),
	async function (req, res) {
		try {
			const updatedEvent = await EventService.update(req.params.id, req.body);
			if (updatedEvent) {
				return res.status(200).json(updatedEvent);
			} else {
				return res.status(404).json({ message: "Event not found" });
			}
		} catch (error) {
			logger.error(error);
			return res.status(500).json({ message: "Error updating event", error });
		}
	}
);

router.delete("/events/:id", AuthMiddleware(), async function (req, res) {
	try {
		const deletedEvent = await EventService.remove(req.params.id);
		if (deletedEvent) {
			return res.status(200).json({ message: "Event deleted successfully" });
		} else {
			return res.status(404).json({ message: "Event not found" });
		}
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ message: "Error deleting event", error });
	}
});

export const EventRouter = router;
