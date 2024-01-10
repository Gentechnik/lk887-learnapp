import { SiOneplus } from "react-icons/si";

interface IProps {
	setIsAddingFlashcard: (isAddingFlashcard: boolean) => void;
	isAddingFlashcard: boolean;
}

export const FlashcardTableHead = ({
	setIsAddingFlashcard,
	isAddingFlashcard,
}: IProps) => {
	return (
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
								setIsAddingFlashcard(!isAddingFlashcard)
							}
							className="hover:text-green-400 cursor-pointer"
						/>
					</div>
				</th>
			</tr>
		</thead>
	);
};
