import { TApiStatus } from "../../src/shared/interfaces";

export const getPort = () => {
	return 4011;
};

export const apiStatus = (): TApiStatus => {
	return {
		status: "live",
		whenLiveAgainDateTime: "",
	};
};
