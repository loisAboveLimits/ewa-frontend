import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./custom.css";
import "./responsive.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); 

export const metadata: Metadata = {
  title: "Energy and Water Academy",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`} >

      <head>
        
        <link rel="apple-touch-icon" sizes="57x57" href="/imgs/favicons/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/imgs/favicons/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/imgs/favicons/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/imgs/favicons/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/imgs/favicons/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/imgs/favicons/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/imgs/favicons/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/imgs/favicons/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/imgs/favicons/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/imgs/favicons/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/imgs/favicons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/imgs/favicons/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/imgs/favicons/favicon-16x16.png"/>
        <link rel="manifest" href="/imgs/favicons/manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/imgs/favicons/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/>

        <Script
          src="https://kit.fontawesome.com/f34a816efd.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />        

      </head>

      <body className="min-h-full flex flex-col bg-white">

        <Header />

        {children}

         <Footer />
      </body>
    </html>
  );
}
