import "./globals.css"
import Navbar from "./comps/Navbar" 
import { AuthProvider } from "../context/AuthContext.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
