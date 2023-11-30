import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "../components/Header";
import ToasterWrapper from "@/components/ToasterWrapper";
import ThemeProvider from "@/components/ThemeProvider";
import RecoilRootProvider from "@/components/RecoilRootProvider";
import SessionProvider from "@/components/AuthProvider";
import "leaflet/dist/leaflet.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recensioni Faziose",
  description: "Recensiamo qualsiasi cosa con criteri discutibili!",
};
export const viewport = {
  width: "device-width",
  initialScale: "1.0",
  maximumScale: "1.0",
  userScalable: 0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, " bg-cover bg-fixed")}>
        <SessionProvider>
          <RecoilRootProvider>
            <ThemeProvider defaultTheme="light" attribute="class">
              <Header />
              <div className="pt-16 pb-24 px-4 h-full">{children}</div>
              <ToasterWrapper />
            </ThemeProvider>
          </RecoilRootProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
