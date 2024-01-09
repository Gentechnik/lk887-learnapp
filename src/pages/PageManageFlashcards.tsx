import { useContext } from "react";
import { AppContext } from "../AppContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	return (
		<>
			<p>This is the info page with {flashcards.length} flashcards.</p>
			<table className="dataTable mt-4">
				<thead>
					<tr>
						<th>SUUID</th>
						<th>Category</th>
						<th>Front</th>
						<th>Back</th>
						<th className="flex justify-center">
							<SiOneplus className="hover:text-green-400" />
						</th>
					</tr>
				</thead>
				<tbody>
					{flashcards.map((flashcard) => {
						return (
							<tr>
								<td>{flashcard.suuid}</td>
								<td>{flashcard.category}</td>
								<td>{flashcard.front}</td>
								<td>{flashcard.back}</td>
								<td className="flex flex-row gap-2">
									<MdEdit className="hover:text-green-400" />
									<RiDeleteBin5Line className="hover:text-red-500" />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
