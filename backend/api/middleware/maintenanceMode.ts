import express from "express";
import * as config from "../config";
import dayjs from "dayjs";

export const maintenanceMode = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	// console.log("in maintenance mode middleware");
	const { status, whenLiveAgainDateTime } = config.apiStatus();
	if (status === "maintenanceMode") {
		// res.status(503).send("site down");
		const whenLiveAgainDayjs = dayjs(whenLiveAgainDateTime);
		const secondsToGo = whenLiveAgainDayjs.diff(dayjs(), "seconds") + 60;
		const minutes = Math.floor((secondsToGo % 3600) / 60);
		const hours = Math.floor(secondsToGo / 3600);
		const duration =
			hours > 0
				? `${hours} hours, ${minutes} minutes`
				: `${minutes} minutes`;
		res.header("Retry-After", String(secondsToGo));
		res.status(503).send(
			`This API is currently in maintenance mode. Expected up time is ${whenLiveAgainDateTime}. Retry in ${duration}.`
		);
	} else {
		next();
	}
};
