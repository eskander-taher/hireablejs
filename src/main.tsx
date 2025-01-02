import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQueryClientProvider from "./components/ReactQueryClientProvider.tsx";
import ToastProvider from "./components/ToastProvider.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<UserProvider>
				<ReactQueryClientProvider>
					<ToastProvider>
						<App />
					</ToastProvider>
				</ReactQueryClientProvider>
			</UserProvider>
		</ThemeProvider>
	</StrictMode>
);
