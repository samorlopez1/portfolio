import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { ScrollToTop } from "@/src/components/ScrollToTop/ScrollToTop";
import "@/src/index.css";
import "@/src/tokens.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://samorlopez.com"),
    title: {
        default: "Samuel Lopez | Portfolio 2026",
        template: "%s | Samuel Lopez",
    },
    description: "Product design portfolio of Samuel Lopez.",
    icons: {
        icon: "/images/favicon.png",
        apple: "/images/apple_touch_icon.png",
    },
    openGraph: {
        title: "Samuel Lopez | Portfolio 2026",
        description: "Product design portfolio of Samuel Lopez.",
        url: "https://samorlopez.com",
        siteName: "Samuel Lopez Portfolio",
        images: [
            {
                url: "/images/og_image.png",
                width: 1200,
                height: 630,
            },
        ],
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ScrollToTop />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
