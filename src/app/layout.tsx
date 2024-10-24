import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { AppStoreProvider } from '@/providers/app-store-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'DayZero',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-dvh font-geist-mono flex  flex-col gap-4 max-w-4xl mx-auto">
            <header className="p-4 flex justify-between container  font-geist-mono pb-0">
              <h1 className="text-2xl font-bold tracking-tight">DayZero</h1>
              <ModeToggle />
            </header>
            <Separator />
            <AppStoreProvider>{children}</AppStoreProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
