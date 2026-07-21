import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Starfield } from "@/components/starfields";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krishna Koushik Unnam — AI/ML Engineer",
  description:
    "AI/ML Engineer with 5+ years designing, training, and deploying foundation models, multimodal LLMs, RAG, RLHF, and enterprise ML at Meta. M.S. CS & Engineering from USF.",
  keywords: [
    "AI/ML Engineer",
    "Foundation Models",
    "PyTorch",
    "RLHF",
    "RAG",
    "MLOps",
    "Multimodal LLMs",
    "vLLM",
    "AWS",
    "Azure",
  ],
  authors: [{ name: "Krishna Koushik Unnam" }],
  openGraph: {
    title: "Krishna Koushik Unnam — AI/ML Engineer",
    description: "AI/ML Engineer | Foundation Models · RAG · RLHF · MLOps · Meta",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="portfolio-theme">
          <Starfield />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
