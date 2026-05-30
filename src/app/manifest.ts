import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TekniSini - Jasa Teknisi Panggilan Bali",
    short_name: "TekniSini",
    description: "Layanan jasa teknisi panggilan cepat & terpercaya di Bali",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0066ff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
