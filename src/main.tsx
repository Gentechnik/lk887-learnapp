import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import "./index.scss";
import { PageWelcome } from "./pages/PageWelcome.tsx";
import { PageManageFlashcards } from "./pages/PageManageFlashcards.tsx";
import { PageAbout } from "./pages/PageAbout.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { AppProvider } from "./AppContext.tsx";
import { TSiteEnvironment } from "./shared/interfaces.ts";

const siteEnvironment: TSiteEnvironment = import.meta.env.VITE_ENV;

let children = [
	{
		path: "welcome",
		element: <PageWelcome />,
	},
	{
		path: "manage-flashcards",
		element: <PageManageFlashcards />,
	},
	{
		path: "about",
		element: <PageAbout />,
	},
	{
		path: "/",
		element: <Navigate to="/welcome" replace />,
	},
];

if (siteEnvironment === "production") {
	children = children.filter((m) => !["manage-flashcards"].includes(m.path));
}

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);
