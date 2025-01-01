import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"
import ReactQueryClientProvider from "./components/ReactQueryClientProvider";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Loader from "./components/Loader";
import ToastProvider from "./components/ToastProvider";

import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/header";

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
				<body className="bg-black text-white">
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
