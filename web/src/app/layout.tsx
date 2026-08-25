import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: MCP server for Canvas LMS`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name}: MCP server for Canvas LMS`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t!=="light":true;document.documentElement.classList.toggle("dark",d);document.documentElement.classList.toggle("light",!d);}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
