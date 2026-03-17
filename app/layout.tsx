// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";

// export const metadata: Metadata = {
//   title: "Krishna Koushik Unnam | Portfolio",
//   description: "Full-stack engineer building scalable software and AI systems.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className="antialiased">
//         <ThemeProvider>{children}</ThemeProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";

// ─── JSON-LD STRUCTURED DATA ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Krishna Koushik Unnam",
  jobTitle: "Full-Stack Software Engineer",
  description:
    "Full-stack software engineer with 3.7+ years of enterprise experience in healthcare, fintech, and academic platforms. Specialises in .NET, Java, React, TypeScript, Azure, and applied AI / LLM systems.",
  email: "mailto:krishnakoushiku@gmail.com",
  url: "https://krishnakoushik.dev",
  sameAs: [
    "https://github.com/krishnakoushik225",
    "https://www.linkedin.com/in/krishna-koushik-unnam-a952741b5/",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of South Florida",
      url: "https://www.usf.edu",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Amrita Vishwa Vidyapeetham",
      url: "https://www.amrita.edu",
    },
  ],
  knowsAbout: [
    "React", "TypeScript", "ASP.NET Core", "Spring Boot", "FastAPI",
    "Azure", "Docker", "Kubernetes", "LangGraph", "RAG Pipelines",
    "PyTorch", "OpenAI", "Full-Stack Engineering", "Applied AI",
  ],
};

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Krishna Koushik Unnam — Full-Stack & AI Engineer",
  description:
    "Full-stack software engineer with 3.7+ years building enterprise platforms in healthcare, fintech, and academia. Expert in React, .NET, Spring Boot, Azure, and AI/LLM systems. M.S. CS @ USF — available June 2026.",
  metadataBase: new URL("https://krishnakoushik.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://krishnakoushik.dev",
    siteName: "Krishna Koushik Unnam",
    title: "Krishna Koushik Unnam — Full-Stack & AI Engineer",
    description:
      "Full-stack software engineer with 3.7+ years building enterprise platforms. React, .NET, Spring Boot, Azure, LangGraph, PyTorch. Available June 2026.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Krishna Koushik Unnam — Full-Stack & AI Engineer portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Koushik Unnam — Full-Stack & AI Engineer",
    description:
      "Full-stack engineer (React, .NET, Spring Boot, Azure, AI/LLM). 3.7 yrs enterprise XP. M.S. CS @ USF. Available June 2026.",
    images: ["/og-image.png"],
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
  keywords: [
    "Krishna Koushik Unnam", "Full Stack Engineer", "Software Engineer",
    "AI Engineer", "React Developer", "ASP.NET Core", "Spring Boot",
    "Azure", "LangGraph", "Machine Learning", "USF Computer Science", "Portfolio",
  ],
  authors: [{ name: "Krishna Koushik Unnam", url: "https://krishnakoushik.dev" }],
  creator: "Krishna Koushik Unnam",
};

// ─── THEME INIT SCRIPT ────────────────────────────────────────────────────────
// This MUST run as a blocking inline script before React hydrates.
// It reads the user's saved preference (or system preference) from localStorage
// and stamps `class="dark"` on <html> before any CSS is painted.
// Without this, dark mode never survives a page refresh.

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (!stored && prefersDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (_) {}
})();
`;

// ─── ROOT LAYOUT ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is required because the inline script mutates
    // the className before React can reconcile — without it you get a hydration
    // mismatch warning in development.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          ⚠️  CRITICAL — do NOT move this script or add `defer` / `async`.
          It must execute synchronously before any CSS is applied so the correct
          theme class is present from the very first paint.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}