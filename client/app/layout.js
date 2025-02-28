"use client"

import "./globals.css"
import Navbar from "./comps/Navbar" 
import { AuthProvider } from "../context/AuthContext.js"
import { usePathname } from "next/navigation"

export default function RootLayout({ children }) {
  const pathname = usePathname()
  
  // For example, hide the Navbar on the landing page ("/") and all "/auth/*" routes.
  const hideNavbar = pathname === "/" || pathname.startsWith("/auth")

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Only render the Navbar if we’re NOT on the landing page or an auth route */}
          {!hideNavbar && <Navbar />}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
