import { roboto } from './ui/fonts';
import './ui/global.css'
import TopNav from './ui/nav/topnav';
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
