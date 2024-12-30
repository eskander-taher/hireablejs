import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"

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
					<Header />
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
