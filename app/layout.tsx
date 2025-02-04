import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextAuthProvider } from "./Provider";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WorkOrbit - Effortless Task Management",
  description: "A whole new concept of task management for offices, schools, and various other fields by Vivek Tarnallya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-orange-200`}
      >
        <NextAuthProvider>
          <Toaster position="bottom-right"  richColors />
          <ToastContainer />
          <NavBar />
          {children}
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
