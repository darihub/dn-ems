import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { TemaProvider } from "@/context/TemaContext";
import TemaWrapper from "@/components/TemaWrapper";

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      // {/* Definimos idioma*/}
      <html lang="es"> 
        <body>
          <AuthProvider>
            <TemaWrapper>
              <Navbar />
              <main>{children}</main>
            </TemaWrapper>
          </AuthProvider>
        </TemaProvider>
      </body>
    </html>
  );
}