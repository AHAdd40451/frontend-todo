import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryProvider from '@/app/QueryProvider';
import "../styles/globals.css";

const inter = localFont({
  src: "./fonts/Inter_18pt-Medium.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
