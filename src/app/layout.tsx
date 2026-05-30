import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppQueryProvider from "@/providers/app-query-provider";
import ThemeProvider from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import JsonLd from "@/components/json-ld";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TekniSini | Jasa Teknisi Panggilan Cepat & Terpercaya di Bali",
    template: "%s | TekniSini",
  },
  description:
    "Layanan jasa teknisi panggilan terbaik di Bali. Hubungi teknisi ahli untuk service AC, kulkas, listrik, pipa, dan elektronik lainnya. Cepat, transparan, dan bergaransi.",
  keywords: [
    "jasa teknisi",
    "teknisi bali",
    "teknisi panggilan",
    "service ac bali",
    "perbaikan elektronik",
    "teknisi listrik bali",
    "teknisi tercepat",
    "teknisi terbaik di bali",
    "tukang service bali",
  ],
  authors: [{ name: "TekniSini Team" }],
  creator: "TekniSini",
  publisher: "TekniSini",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://teknisini.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TekniSini | Jasa Teknisi Panggilan Cepat & Terpercaya di Bali",
    description:
      "Solusi praktis untuk semua masalah teknis Anda. Teknisi ahli langsung ke lokasi Anda di seluruh wilayah Bali.",
    url: "https://teknisini.com",
    siteName: "TekniSini",
    images: [
      {
        url: "/images/Hero-Teknisini.jpg",
        width: 1200,
        height: 630,
        alt: "TekniSini - Jasa Teknisi Terpercaya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TekniSini | Jasa Teknisi Panggilan Cepat & Terpercaya di Bali",
    description:
      "Solusi praktis untuk semua masalah teknis Anda. Teknisi ahli langsung ke lokasi Anda.",
    images: ["/images/Hero-Teknisini.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <AppQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </AppQueryProvider>
      </body>
    </html>
  );
}
