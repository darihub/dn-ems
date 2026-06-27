  import { AuthProvider } from "@/context/AuthContext";
  import Navbar from "@/components/Navbar";
  import "./globals.css";

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
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </body>
      </html>
    )
  }