import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<ReduxProvider store={store}>
			<Provider>
				<App />
			</Provider>
		</ReduxProvider>
	</BrowserRouter>
);
