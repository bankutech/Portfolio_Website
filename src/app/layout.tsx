import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sagnik Mitra | Software Engineer",
  description: "Computer Science Engineering student specializing in AI & ML at SRM IST.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import Preloader from "@/components/ui/Preloader";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-body selection:bg-accent selection:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorProvider>
            <Preloader />
            <CustomCursor />
            {children}
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
