import React from "react";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "TekniSini",
    image: "https://teknisini.com/images/Hero-Teknisini.jpg",
    "@id": "https://teknisini.com",
    url: "https://teknisini.com",
    telephone: "+628123456789", // Placeholder, adjust if needed
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Teuku Umar No. 1",
      addressLocality: "Denpasar",
      addressRegion: "Bali",
      postalCode: "80113",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.65,
      longitude: 115.216667,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.facebook.com/teknisini",
      "https://www.instagram.com/teknisini",
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "State",
      name: "Bali",
    },
    description: "Layanan jasa teknisi panggilan terbaik di Bali. Hubungi teknisi ahli untuk service AC, kulkas, listrik, pipa, dan elektronik lainnya.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
