import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdEdit, MdCancel } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";
import { FaRegSave } from "react-icons/fa";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(true);
	return (
		<>
			<p>This is the info page with {flashcards.length} flashcards.</p>
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
										setIsAddingFlashcard(!isAddingFlashcard)
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
									name=""
									id=""
								/>
							</td>
							<td>
								<input
									className="w-full"
									type="text"
									name=""
									id=""
								/>
							</td>
							<td>
								<input
									className="w-full"
									type="text"
									name=""
									id=""
								/>
							</td>
							<td>
								<div className="flex justify-center gap-2">
									<FaRegSave className="hover:text-green-400 cursor-pointer" />
									<MdCancel className="hover:text-red-500 cursor-pointer" />
								</div>
							</td>
						</tr>
					)}
					{flashcards.map((flashcard) => {
						return (
							<tr>
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
		</>
	);
};
