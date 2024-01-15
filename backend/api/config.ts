import { TApiStatus } from "../../src/shared/interfaces";

export const getPort = () => {
	return 4011;
};

export const apiStatus = (): TApiStatus => {
	return {
		status: "live",
		whenLiveAgainDateTime: "2024-01-15 11:00:00",
	};
};
