import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Topbar } from "@/components/layout/Topbar";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Pixel Pint Arcade | Blog about 2D Games",
  description: "Blog, videos and dev lab about 2D games, consoles and retro culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pressStart2P.variable}>
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
