import type { Metadata } from "next";
import { Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeonBlade UI",
  description: "Modern and futuristic UI component library.",
  icons: {
    icon: "/neonblade_ui_logo.png",
    shortcut: "/neonblade_ui_logo.png",
    apple: "/neonblade_ui_logo.png",
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
      className={`${rajdhani.variable} ${orbitron.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content="QAD1AMG8SogfS8OcbMtSolJstIdF0EeBiDo6BSqqsHM"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground dark"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
