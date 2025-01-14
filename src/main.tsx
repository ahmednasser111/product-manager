import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./app/store.ts";
import Loading from "./components/layout/Loading.tsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
	<Provider>
		<BrowserRouter>
			<ReduxProvider store={store}>
				<PersistGate loading={<Loading />} persistor={persistor}>
					<App />
				</PersistGate>
			</ReduxProvider>
		</BrowserRouter>
	</Provider>
);
