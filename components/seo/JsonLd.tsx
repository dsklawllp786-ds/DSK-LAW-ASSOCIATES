import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.phoneDisplay,
        email: siteConfig.email,
        image: `${siteConfig.url}${siteConfig.ownerImage}`,
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "200L/3R/1, Kasari Masari Road near Sabri Masjid, IIITA Rd, Roshan Bag",
          addressLocality: "Prayagraj",
          addressRegion: "Uttar Pradesh",
          postalCode: "211015",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.435,
          longitude: 81.784,
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
          ],
        },
        areaServed: {
          "@type": "City",
          name: "Prayagraj",
        },
        priceRange: "$$",
        founder: {
          "@type": "Person",
          name: siteConfig.owner,
        },
        knowsAbout: ["Criminal Law", "Civil Law"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
