import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	return (
		<>
			<p>This is the info page with {flashcards.length} flashcards.</p>
			<table className="dataTable">
				<thead>
					<tr>
						<th>SUUID</th>
						<th>Category</th>
						<th>Front</th>
						<th>Back</th>
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
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
