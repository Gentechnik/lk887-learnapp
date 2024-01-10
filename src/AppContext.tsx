import { createContext, useEffect, useState } from "react";
import {
	IFlashcard,
	IFrontendFlashcard,
	INewFlashcard,
	IPromiseResolution,
	convertFlashcardToFrontendFlashcard,
} from "./shared/interfaces";
import axios from "axios";

interface IAppContext {
	frontendFlashcards: IFrontendFlashcard[];
	saveAddFlashcard: (
		newFlashcard: INewFlashcard
	) => Promise<IPromiseResolution>;
	deleteFlashcard: (flashcard: IFlashcard) => Promise<IPromiseResolution>;
}
interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = "http://localhost:4011";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [frontendFlashcards, setFrontendFlashcards] = useState<
		IFrontendFlashcard[]
	>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/api/flashcards`);
			const _flashcards = response.data;
			const _frontendFlashcards = [];
			for (const _flashcard of _flashcards) {
				const _frontendFlashcard: IFrontendFlashcard = {
					..._flashcard,
					userIsDeleting: false,
				};
				_frontendFlashcards.push(_frontendFlashcard);
			}
			setFrontendFlashcards(_frontendFlashcards);
		})();
	}, []);

	const saveAddFlashcard = async (newFlashcard: INewFlashcard) => {
		return new Promise<IPromiseResolution>((resolve, reject) => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			(async () => {
				try {
					const response = await axios.post(
						`${backendUrl}/api/flashcards`,
						newFlashcard,
						{ headers }
					);
					if (response.status === 201) {
						const flashcard: IFlashcard = response.data;
						const frontendFlashcard =
							convertFlashcardToFrontendFlashcard(flashcard);
						frontendFlashcards.push(frontendFlashcard);
						const _frontendFlashcards =
							structuredClone(frontendFlashcards);
						setFrontendFlashcards(_frontendFlashcards);
						resolve({ message: "ok" });
					} else {
						reject({
							message: `ERROR: status code ${response.status}`,
						});
					}
				} catch (e: any) {
					reject({
						message: `ERROR: ${e.message}`,
					});
				}
			})();
		});
	};

	const deleteFlashcard = (flashcard: IFlashcard) => {
		return new Promise<IPromiseResolution>((resolve, reject) => {
			(async () => {
				try {
					const response = await axios.delete(
						`${backendUrl}/api/flashcards/${flashcard.suuid}`
					);
					if (response.status === 200) {
						const _frontendFlashcards = frontendFlashcards.filter(
							(m) => m.suuid !== flashcard.suuid
						);
						setFrontendFlashcards(_frontendFlashcards);
						resolve({ message: "ok" });
					} else {
						reject({
							message: `ERROR: status code ${response.status}`,
						});
					}
				} catch (e: any) {
					reject({
						message: `ERROR: ${
							e.message + " / " + e.response.data
						}`,
					});
				}
			})();
		});
	};

	return (
		<AppContext.Provider
			value={{
				frontendFlashcards,
				saveAddFlashcard,
				deleteFlashcard,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
