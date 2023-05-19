import "@uploadthing/react/styles.css";
import "@/styles/globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: "#19191A",
          colorInputBackground: "#19191A",
          colorAlphaShade: "white",
          colorText: "white",
          colorInputText: "white",
          colorShimmer: "rgba(255,255,255,0.36)",
          shadowShimmer: "1px 1px 2px rgba(0,0,0,0.36)",
        },
        elements: {
          providerIcon__apple: { filter: "invert(1)" },
          providerIcon__github: { filter: "invert(1)" },
          activeDeviceIcon: {
            "--cl-chassis-bottom": "#d2d2d2",
            "--cl-chassis-back": "#e6e6e6",
            "--cl-chassis-screen": "#e6e6e6",
            "--cl-screen": "#111111",
          },
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <Providers>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className=" flex-1">{children}</div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
