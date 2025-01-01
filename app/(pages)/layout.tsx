import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import ReactQueryClientProvider from "../components/ReactQueryClientProvider";
import ToastProvider from "../components/ToastProvider";
import type { Metadata } from "next";
import Header from "../components/header";

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
