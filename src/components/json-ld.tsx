import React from "react";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://teknisini.com/#website",
        url: "https://teknisini.com/",
        name: "TekniSini",
        inLanguage: "id-ID",
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://teknisini.com/#business",
        name: "TekniSini",
        image: "https://teknisini.com/images/Hero-Teknisini.jpg",
        url: "https://teknisini.com/",
        priceRange: "$$",
        areaServed: {
          "@type": "State",
          name: "Bali",
        },
        description:
          "Layanan jasa teknisi panggilan untuk perbaikan AC, kulkas, listrik, pipa, pompa air, dan elektronik di Bali.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Layanan Teknisi Panggilan",
          itemListElement: [
            "Service AC",
            "Service kulkas dan mesin cuci",
            "Teknisi listrik",
            "Perbaikan pompa air dan pipa",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              areaServed: "Bali",
            },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
