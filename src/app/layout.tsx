import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars",
  description: "Star Wars project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <Header />
          <div className="flex justify-center">
            <div className="w-full overflow-auto max-w-6xl">{children}</div>
          </div>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
