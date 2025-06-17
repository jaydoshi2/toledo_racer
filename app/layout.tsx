// "use client"
import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"


// import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Deep Fly - Get started with reinforcement learning in Drone",
  description: "Learn how to get started with Deep Fly and reinforcement learning in Drone",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html  className="light" >
      <body className={inter.className}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  )
}

