import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Cormorant_Garamond, Manrope, Michroma, Outfit } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const michroma = Michroma({
  subsets: ["latin"],
  variable: "--font-michroma",
  weight: ["400"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://centroessenza.cl");
const metadataImage = "/logofull.png";

export const metadata = {
  title: {
    default: "Centro Integral ESSENZA | Salud, Bienestar y Estética en Pitrufquén",
    template: "%s | Centro Integral ESSENZA",
  },
  description:
    "Centro integral de salud en Pitrufquén. Medicina general, psicología, nutrición, fonoaudiología, cosmetología y terapias complementarias. Agenda tu hora online.",
  keywords: [
    "centro integral Pitrufquén",
    "ESSENZA centro de salud",
    "agenda hora Pitrufquén",
    "medicina general Pitrufquén",
    "psicología Pitrufquén",
    "nutrición Pitrufquén",
    "cosmetología Pitrufquén",
    "bienestar integral",
    "terapias complementarias",
    "fonoaudiología Pitrufquén",
    "salud integral",
    "centro médico La Araucanía",
  ],
  authors: [{ name: "Centro Integral ESSENZA", url: metadataBase.href }],
  publisher: "Centro Integral ESSENZA",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: metadataBase.href,
  },
  icons: {
    icon: "/logofavcom.png",
    shortcut: "/logofavcom.png",
    apple: "/logofavcom.png",
  },
  openGraph: {
    title: "Centro Integral ESSENZA | Salud, Bienestar y Estética en Pitrufquén",
    description:
      "Medicina, psicología, nutrición, fonoaudiología, cosmetología y terapias complementarias. Agenda tu hora online en Centro Integral ESSENZA.",
    url: metadataBase.href,
    siteName: "Centro Integral ESSENZA",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: metadataImage,
        width: 1600,
        height: 900,
        alt: "Centro Integral ESSENZA - Salud, Bienestar y Estética",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro Integral ESSENZA | Pitrufquén",
    description: "Salud integral para cuerpo, mente y belleza. Agenda tu hora online.",
    images: [metadataImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${manrope.variable} ${cormorant.variable} ${michroma.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-white">
        {/*
          AgendaProvider DEBE envolver AnimatedLayout (no estar dentro).
          AnimatedLayout desmonta/remonta sus hijos en cada navegación
          (usa key={pathname} + AnimatePresence). Si AgendaProvider
          estuviera adentro, su estado (fecha, hora, servicio) se reiniciaría
          en cada cambio de ruta, perdiendo los datos entre el calendario y el formulario.
        */}
        <AgendaProvider>
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </AgendaProvider>
      </body>
    </html>
  );
}
