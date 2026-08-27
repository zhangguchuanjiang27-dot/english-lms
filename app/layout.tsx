import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voca | Online English Academy",
  description: "Premium online English learning platform specializing in vocabulary-first mastery.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground w-screen overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
