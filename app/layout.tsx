import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "./home/navbarWrapper";

export const metadata: Metadata = {
  title: "CitiBank",
  description: "Trusted by millions around the globe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
