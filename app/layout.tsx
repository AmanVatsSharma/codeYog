import type { Metadata } from "next";
import "./globals.css";
import { AppThemeProvider } from "@/components/providers/theme-provider";

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
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}
