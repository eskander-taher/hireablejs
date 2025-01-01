import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"
import ReactQueryClientProvider from "./component/ReactQueryClientProvider";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Loader from "./component/Loader";
import ToastProvider from "./component/ToastProvider";

import type { Metadata } from "next";
import "./globals.css";

import Header from "./component/header";

export const metadata: Metadata = {
	title: "HireableJS",
	description: "A zone for all despreate JavaScript developers",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<Analytics />
			<html lang="en">
				<body>
					<ClerkLoading>
						<Loader />
					</ClerkLoading>
					<ClerkLoaded>
						<ReactQueryClientProvider>
							<ToastProvider>
								<Header />
								<main>{children}</main>
							</ToastProvider>
						</ReactQueryClientProvider>
					</ClerkLoaded>
				</body>
			</html>
		</ClerkProvider>
	);
}
