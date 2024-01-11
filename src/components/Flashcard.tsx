import { ITestingFlashcard } from "../shared/interfaces";

interface IProps {
	testingFlashcard: ITestingFlashcard;
	testingFlashcards: ITestingFlashcard[];
	setTestingFlashcards: (testingFlashcards: ITestingFlashcard[]) => void;
}

export const Flashcard = ({
	testingFlashcard,
	testingFlashcards,
	setTestingFlashcards,
}: IProps) => {
	const handleToggleFlashcard = (testingFlashcard: ITestingFlashcard) => {
		testingFlashcard.backIsShowing = !testingFlashcard.backIsShowing;
		setTestingFlashcards(structuredClone(testingFlashcards));
	};

	return (
		<div className="mb-4 w-[40rem]">
			<div
				className="bg-slate-500 p-4 rounded-t-lg"
				onClick={() => handleToggleFlashcard(testingFlashcard)}
			>
				{testingFlashcard.front}
			</div>
			{testingFlashcard.backIsShowing && (
				<div className="bg-slate-300 p-4 rounded-b-lg">
					{testingFlashcard.back}
				</div>
			)}
		</div>
	);
};
