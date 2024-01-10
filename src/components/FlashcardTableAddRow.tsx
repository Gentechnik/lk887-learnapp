import { ChangeEvent, useContext } from "react";
import { INewFlashcard } from "../shared/interfaces";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AppContext } from "../AppContext";

interface IProps {
	newFlashcard: INewFlashcard;
	setNewFlashcard: (newFlashcard: INewFlashcard) => void;
	handleCancelAddFlashcard: () => void;
}

export const FlashcardTableAddRow = ({
	newFlashcard,
	setNewFlashcard,
	handleCancelAddFlashcard,
}: IProps) => {
	const { saveAddFlashcard } = useContext(AppContext);

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
		<tr>
			<td></td>
			<td>
				<input
					value={newFlashcard.category}
					onChange={(e) =>
						handleChangeNewFlashcardField(e, "category")
					}
					className="w-full"
				/>
			</td>
			<td>
				<input
					value={newFlashcard.front}
					onChange={(e) => handleChangeNewFlashcardField(e, "front")}
					className="w-full"
				/>
			</td>
			<td>
				<input
					value={newFlashcard.back}
					onChange={(e) => handleChangeNewFlashcardField(e, "back")}
					className="w-full"
				/>
			</td>
			<td>
				<div className="flex gap-1">
					<FaRegSave
						onClick={handleSaveAddFlashcard}
						className="cursor-pointer hover:text-green-900"
					/>
					<MdCancel
						onClick={handleCancelAddFlashcard}
						className="cursor-pointer hover:text-red-900"
					/>
				</div>
			</td>
		</tr>
	);
};
