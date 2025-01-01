import { Analytics } from "@vercel/analytics/react";
import ReactQueryClientProvider from "./components/ReactQueryClientProvider";
import ToastProvider from "./components/ToastProvider";

import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "HireableJS",
	description: "The zone for all despreate JavaScript developers",
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
					<ReactQueryClientProvider>
						<ToastProvider>
							<Header />
							<main>{children}</main>
						</ToastProvider>
					</ReactQueryClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
