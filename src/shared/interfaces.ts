export interface INewFlashcard {
	category: string;
	front: string;
	back: string;
}

export const blankNewFlashcard: INewFlashcard = {
	category: "linux",
	front: "",
	back: "",
};

export interface IFlashcard extends INewFlashcard {
	suuid: string;
}

export interface IFrontendFlashcard extends IFlashcard {
	userIsDeleting: boolean;
	userIsEditing: boolean;
}

export const convertFrontendFlashcardToFlashcard = (
	frontendFlashcard: IFrontendFlashcard
): IFlashcard => {
	return {
		...frontendFlashcard,
	};
};

export const convertFlashcardToFrontendFlashcard = (
	flashcard: IFlashcard
): IFrontendFlashcard => {
	return {
		...flashcard,
		userIsDeleting: false,
		userIsEditing: false,
	};
};

export interface IPatchFlashcard {
	category?: string;
	front?: string;
	back?: string;
}

export interface IDatabase {
	flashcards: IFlashcard[];
}

export interface IPromiseResolution {
	message: string;
}
