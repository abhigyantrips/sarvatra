import type { Metadata, Viewport } from 'next';

import { siteConfig } from '@/config/site';

import { fontMono, fontSans } from '@/lib/fonts';
import { useCurrentRole } from '@/lib/use-current-role';
import { cn } from '@/lib/utils';

import { SiteHeader } from '@/components/site-header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/sonner';

import '@/styles/globals.css';

import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.title}`,
    template: `%s - ${siteConfig.title}`,
  },
  description: `${siteConfig.description}`,
  icons: {
    icon: '/institute.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await useCurrentRole();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'relative flex min-h-screen flex-col bg-background font-sans antialiased transition-colors duration-200',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          <SiteHeader role={role ?? 'STUDENT'} />
          <div className="container flex-1">{children}</div>
          <TailwindIndicator />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
