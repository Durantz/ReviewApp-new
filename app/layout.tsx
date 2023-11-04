import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "../components/Header";
import ToasterWrapper from "@/components/ToasterWrapper";
import ThemeProvider from "@/components/ThemeProvider";
import lightBackground from "@/public/Background_Light.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body
        className={cn(inter.className, " bg-cover bg-fixed")}
        // style={{ backgroundImage: `url(${lightBackground.src})` }}
      >
        <ThemeProvider defaultTheme="light" attribute="class">
          <Header />
          <div className="pt-16 pb-24 px-4 h-full">{children}</div>
          <ToasterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
