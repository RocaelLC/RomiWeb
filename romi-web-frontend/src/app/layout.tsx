
import "./globals.css";
import Navbar from "@/components/Nav";
import { AuthProvider } from "./Auth/contexts/AuthContext";

export const metadata = { title: "ROMI", description: "Salud mental" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="pt-[64px] max-w-6xl mx-auto px-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
  
  
}
