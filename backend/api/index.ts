import * as config from "./config";
import { app } from "./server";

console.log(process.cwd());

app.listen(config.getPort(), () => {
	console.log(
		`AppLearn API is running at http://localhost:${config.getPort()}`
	);
});
