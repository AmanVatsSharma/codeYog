import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeYog",
  description: "A Coding Tapasya Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-black text-white">
        {children}
      </body>
    </html>
  );
}
