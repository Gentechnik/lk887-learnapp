import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdEdit, MdCancel } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
	IFrontendFlashcard,
	INewFlashcard,
	blankNewFlashcard,
	convertFrontendFlashcardToFlashcard,
} from "../shared/interfaces";
import { FlashcardTableHead } from "../components/FlashcardTableHead";
import { FlashcardTableAddRow } from "../components/FlashcardTableAddRow";

export const PageManageFlashcards = () => {
	const { frontendFlashcards, setFrontendFlashcards, deleteFlashcard } =
		useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
	const [newFlashcard, setNewFlashcard] = useState<INewFlashcard>(
		structuredClone(blankNewFlashcard)
	);

	const handleCancelAddFlashcard = () => {
		setIsAddingFlashcard(false);
		setNewFlashcard(structuredClone(blankNewFlashcard));
	};

	const handleSetFlashcardToDeleting = (
		frontendFlashcard: IFrontendFlashcard
	) => {
		frontendFlashcard.userIsDeleting = !frontendFlashcard.userIsDeleting;
		setFrontendFlashcards(structuredClone(frontendFlashcards));
	};

	const handleDeleteFlashcard = (frontendFlashcard: IFrontendFlashcard) => {
		try {
			(async () => {
				const flashcard =
					convertFrontendFlashcardToFlashcard(frontendFlashcard);
				const response = await deleteFlashcard(flashcard);
				if (response.message === "ok") {
					handleCancelAddFlashcard();
				}
			})();
		} catch (e: any) {
			console.log(`ERROR: ${e.message}`);
			alert(
				"We're sorry, your flashcard could not be saved at this moment."
			);
		}
	};

	return (
		<>
			<p>
				This is the info page with {frontendFlashcards.length}{" "}
				flashcards.
			</p>
			<form action="">
				<table className="dataTable mt-4 w-[60rem]">
					<FlashcardTableHead
						isAddingFlashcard={isAddingFlashcard}
						setIsAddingFlashcard={setIsAddingFlashcard}
					/>
					<tbody>
						{isAddingFlashcard && (
							<FlashcardTableAddRow
								newFlashcard={newFlashcard}
								setNewFlashcard={setNewFlashcard}
								handleCancelAddFlashcard={
									handleCancelAddFlashcard
								}
							/>
						)}
						{frontendFlashcards.map((frontendFlashcard) => {
							return (
								<tr
									className={
										frontendFlashcard.userIsDeleting
											? "deleting"
											: ""
									}
									key={frontendFlashcard.suuid}
								>
									<td>{frontendFlashcard.suuid}</td>
									<td>{frontendFlashcard.category}</td>
									<td>{frontendFlashcard.front}</td>
									<td>{frontendFlashcard.back}</td>
									<td>
										{frontendFlashcard.userIsDeleting ? (
											<div className="flex gap-1">
												<RiDeleteBin5Line
													onClick={() =>
														handleDeleteFlashcard(
															frontendFlashcard
														)
													}
													className="cursor-pointer hover:text-red-900"
												/>
												<MdCancel
													onClick={() =>
														handleSetFlashcardToDeleting(
															frontendFlashcard
														)
													}
													className="cursor-pointer hover:text-yellow-600"
												/>
											</div>
										) : (
											<div className="flex gap-1">
												<MdEdit className="cursor-pointer hover:text-green-900" />
												<RiDeleteBin5Line
													onClick={() =>
														handleSetFlashcardToDeleting(
															frontendFlashcard
														)
													}
													className="cursor-pointer hover:text-red-900"
												/>
											</div>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</form>
		</>
	);
};
