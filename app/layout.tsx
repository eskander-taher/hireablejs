import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

import Header from "./component/header";
import Loader from "./component/Loader";

export const metadata: Metadata = {
  title: "HireableJS",
  description: "A zone for all desperate JavaScript developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main>
            <ClerkLoading>
              <Loader />
            </ClerkLoading>
            <ClerkLoaded>
              <Header />
              {children}
            </ClerkLoaded>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
