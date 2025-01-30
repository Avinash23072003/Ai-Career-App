import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from '@clerk/themes'

const inter=Inter({subsets:["latin"]})

export const metadata={
  title:"AI Career",
  description:"AI Career is a platform for AI enthusiasts to learn and grow in the field of AI and Machine Learning",
  image:"/images/ai.jpg",
  url:"https://aicareer.vercel.app",
  type:"website"
}
export default function RootLayout({ children }) {
  console.log("Clerk Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
 <ClerkProvider 
 appearance={{
  baseTheme: dark,
}}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header></Header>
            <main className="min-h-screen">{children}</main>
            {/* footer */}
            <footer className="bg-muted/50  py-12">
              <div className="container mx-auto   px-4 text-center text-gray-200">
                <p>Made by Avinash with 💟 </p>
              </div>
            </footer>
            
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>

  );
}
