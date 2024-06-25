import type { Metadata } from 'next';
// import { Inter } from "next/font/google";
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Providers from '@/components/providers/Providers';
import NavBar from '@/components/NavBar';

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'My Tasks',
  description: 'Keep track of your tasks!',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <NavBar />
          {children}
          {modal}
        </body>
      </html>
    </Providers>
  );
}
