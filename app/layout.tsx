import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, IBM_Plex_Mono } from "next/font/google";
import { MotionProvider } from "@/components/site/MotionProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteTransition } from "@/components/transitions/SiteTransition";
import { introScript } from "@/lib/home-intro";
import "./globals.css";

// Headings use Arial, a system font, so it isn't loaded here (see --font-display in globals.css).

// Body and interface text. Next.js has no metrics for this font, so it can't build a
// size-matched fallback (a build warning says so); system-ui stands in until it loads.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Apple Blossom Commons · Chelan, Washington",
    template: "%s · Apple Blossom Commons",
  },
  description:
    "A generational, mixed-use community in Chelan, Washington, planned around the Lake Chelan Health Hospital campus and stewarded by Chelan Village, LP.",
  // Draft site: keep it out of search engines until the owner and Andy approve launch (Phase 5).
  robots: { index: false, follow: false },
};

// Browser UI color matches the linen ground (light theme only for v1).
export const viewport: Viewport = { themeColor: "#fbf6ee" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${atkinson.variable} ${plexMono.variable}`}
      // The intro script adds data-intro to <html> before hydration (lib/home-intro.ts).
      suppressHydrationWarning
    >
      <head>
        {/* Picks the Home intro before the first paint so its start state never flashes (lib/home-intro.ts). */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* Without JavaScript there is no intro: show everything. */}
        <noscript>
          <style>{`.home-loader{display:none!important}[data-intro-el],[data-enter],#site-header{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded bg-linen px-4 py-2 text-base text-hearth focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteTransition>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </SiteTransition>
        </MotionProvider>
      </body>
    </html>
  );
}
