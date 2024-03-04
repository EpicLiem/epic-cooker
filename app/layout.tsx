import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {cn} from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Epic Cooker",
  description: "A recipe website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <meta property="og:image" content="/cuisines.png"/>
      <meta property="og:title" content="Epic Cooker"/>
      <meta property="og:url" content="/"/>
    </head>
    <body className={cn(inter.className, "dark")}>{children}</body>
    </html>
  );
}
