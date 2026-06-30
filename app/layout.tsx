import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saahvik.com"),
  title: {
    default: "SAAHVIK — Smarter Hostel Management",
    template: "%s · SAAHVIK",
  },
  description:
    "A next-generation hostel management platform designed to simplify operations, automate daily tasks, and deliver a seamless experience for administrators, wardens, staff, students, and parents.",
  keywords: [
    "hostel management",
    "hostel software",
    "SAAHVIK",
    "hostel ERP",
    "student management",
    "warden app",
  ],
  authors: [{ name: "SAAHVIK" }],
  openGraph: {
    title: "SAAHVIK — Smarter Hostel Management",
    description:
      "One intelligent platform for admissions, fees, attendance, visitors, and everything in between. Join early access.",
    type: "website",
    siteName: "SAAHVIK",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAAHVIK — Smarter Hostel Management",
    description:
      "One intelligent platform for every hostel workflow. Join early access.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1a2f" },
    { media: "(prefers-color-scheme: light)", color: "#fbf8f1" },
  ],
};

// Apply the saved theme before first paint to avoid a flash.
const themeBoot = `(function(){try{var t=localStorage.getItem('saahvik-theme');var dark=t?t==='dark':true;var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(dark?'dark':'light');r.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
