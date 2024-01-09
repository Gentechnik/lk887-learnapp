import { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdEdit, MdCancel } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";
import { FaRegSave } from "react-icons/fa";
import { INewFlashcard, blankNewFlashcard } from "../shared/interfaces";

export const PageManageFlashcards = () => {
	const { flashcards, saveAddFlashcard } = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
	const [newFlashcard, setNewFlashcard] = useState<INewFlashcard>(
		structuredClone(blankNewFlashcard)
	);

	const handleChangeNewFlashcardField = (
		e: ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const value = e.target.value;
		switch (field) {
			case "category":
				newFlashcard.category = value;
				break;
			case "front":
				newFlashcard.front = value;
				break;
			case "back":
				newFlashcard.back = value;
		}
		const _newFlashcard = structuredClone(newFlashcard);
		setNewFlashcard(_newFlashcard);
	};

	const handleCancelAddFlashcard = () => {
		setIsAddingFlashcard(false);
		setNewFlashcard(structuredClone(blankNewFlashcard));
	};

	const handleSaveAddFlashcard = () => {
		try {
			(async () => {
				const response = await saveAddFlashcard(newFlashcard);
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
			<p>This is the info page with {flashcards.length} flashcards.</p>
			<form action="">
				<table className="dataTable mt-4 w-[60rem]">
					<thead>
						<tr>
							<th>SUUID</th>
							<th>Category</th>
							<th>Front</th>
							<th>Back</th>
							<th>
								<div className="flex justify-center">
									<SiOneplus
										onClick={() =>
											setIsAddingFlashcard(
												!isAddingFlashcard
											)
										}
										className="hover:text-green-400 cursor-pointer"
									/>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{isAddingFlashcard && (
							<tr>
								<td></td>
								<td>
									<input
										className="w-full"
										type="text"
										value={newFlashcard.category}
										onChange={(e) =>
											handleChangeNewFlashcardField(
												e,
												"category"
											)
										}
										name=""
										id=""
									/>
								</td>
								<td>
									<input
										className="w-full"
										type="text"
										value={newFlashcard.front}
										onChange={(e) =>
											handleChangeNewFlashcardField(
												e,
												"front"
											)
										}
									/>
								</td>
								<td>
									<input
										className="w-full"
										type="text"
										value={newFlashcard.back}
										onChange={(e) =>
											handleChangeNewFlashcardField(
												e,
												"back"
											)
										}
									/>
								</td>
								<td>
									<div className="flex justify-center gap-2">
										<FaRegSave
											onClick={handleSaveAddFlashcard}
											className="hover:text-green-400 cursor-pointer"
										/>
										<MdCancel
											onClick={handleCancelAddFlashcard}
											className="hover:text-red-500 cursor-pointer"
										/>
									</div>
								</td>
							</tr>
						)}
						{flashcards.map((flashcard) => {
							return (
								<tr key={flashcard.suuid}>
									<td>{flashcard.suuid}</td>
									<td>{flashcard.category}</td>
									<td>{flashcard.front}</td>
									<td>{flashcard.back}</td>
									<td>
										<div className="flex gap-2 h-full">
											<MdEdit className="hover:text-green-400 cursor-pointer" />
											<RiDeleteBin5Line className="hover:text-red-500 cursor-pointer" />
										</div>
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
