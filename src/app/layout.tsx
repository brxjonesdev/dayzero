import type { Metadata } from 'next';
import './globals.css';
import { Onest, Unbounded } from 'next/font/google';
import { ThemeProvider } from '@/components/shadcn/ui/theme-provider';

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
});

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
      <body className={`${unbounded.variable} ${onest.variable} } antialiased`}>
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
