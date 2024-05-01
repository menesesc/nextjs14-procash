import { roboto } from './ui/fonts';
import './ui/global.css'
import TopNav from './ui/nav/topnav';
// import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react';
import { AppWrapper } from './context';
import { Toaster } from "@/components/ui/toaster"
export const metadata = {
  title:"ProCash",
  description:"Herramientas para tecnicos de Prosegur Cash",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.png"
  },
  themecolor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>
          <TopNav />
          <AppWrapper>
            {children}
          </AppWrapper>
          <Toaster />
          <Analytics />
        </body>
      </html>
  );
}
