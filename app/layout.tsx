import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madplan",
  description: "7-dages aftensmadsplan med fokus på tilbud"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
