import express from "express";

export const app = express();

app.get("/", (req, res) => {
	res.json({
		appName: "API for App Learn version 0.1",
	});
});
