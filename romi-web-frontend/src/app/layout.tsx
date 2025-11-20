import "./globals.css";
import Navbar from "@/components/Nav";
import { AuthProvider } from "./Auth/contexts/AuthContext";
import { Fredoka, Poppins } from "next/font/google";

// Single family (Fredoka) supports multiple weights; "Fredoka One" is deprecated variant w/ only 400
const fredoka = Fredoka({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: 'swap',
  preload: true,
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
});

export const metadata = { 
  title: "ROMI", 
  description: "Salud mental",
  icons: {
    icon: "/images/iconoROMI.png",
    apple: "/images/iconoROMI.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fredoka.className} ${fredoka.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-b from-[#D58B88] to-[#EBD9D8] overflow-x-hidden">
        <AuthProvider>
          <Navbar />
          <main className="pt-[0px] max-w-6xl mx-auto px-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
  
  
}
