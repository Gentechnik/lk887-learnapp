import * as config from "./config";
import { app } from "./server";

app.listen(config.getPort, () => {
	console.log(
		`App Learn API is running at http://localhost:${config.getPort()}`
	);
});
