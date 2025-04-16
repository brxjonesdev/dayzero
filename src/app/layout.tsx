import type { Metadata } from 'next';
import './globals.css';
import { Raleway, Open_Sans } from "next/font/google"
import { ThemeProvider } from '@/shared/components/shadcn/ui/theme-provider';


const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'DayZero',
  description:
    'DayZero is a journaling app that helps you track your mood and habits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable} ${openSans.variable}  antialiased`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
