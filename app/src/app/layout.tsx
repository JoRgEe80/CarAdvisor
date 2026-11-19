import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Cabecera from "@/components/Cabecera";
import Pie from "@/components/Pie";
import "./globals.css";

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
    default: "CarAdvisor · Elige coche sin saber de coches",
    template: "%s · CarAdvisor",
  },
  description: "Te ayudamos a elegir coche aunque no sepas nada de coches",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Cabecera />
        <div className="flex flex-1 flex-col">{children}</div>
        <Pie />
      </body>
    </html>
  );
}
