import express from "express";
import * as config from "../config";
import dayjs from "dayjs";

export const maintenanceMode = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	// console.log("in maintenance mode middleware");
	const apiStatus = config.apiStatus();
	if (apiStatus.status === "maintenanceMode") {
		res.status(503);
	}
	next();
};
