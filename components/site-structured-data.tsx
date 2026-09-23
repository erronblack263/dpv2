const siteUrl = "https://portfolio.sagetech.co.zw";
const avatarUrl = "https://portfolio.sagetech.co.zw/witness-avatar.png";
const logoUrl =
  process.env.NEXT_PUBLIC_CLOUDINARY_LOGO_URL ||
  "https://portfolio.sagetech.co.zw/sage-logo.png";

const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Witness H Musonza",
      jobTitle: "Software Developer",
      url: siteUrl,
      image: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#personimage`,
        url: avatarUrl,
        contentUrl: avatarUrl,
        caption: "Witness H Musonza - Software Developer",
        width: 1024,
        height: 1024,
      },
      sameAs: ["https://www.linkedin.com/in/witnessmusonza"],
      knowsAbout: [
        "Full Stack Development",
        "Web Applications",
        "Mobile Applications",
        "Backend Systems",
        "Systems Programming",
        "AI Products",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#webpage`,
      name: "Witness H Musonza | Software Developer",
      url: siteUrl,
      mainEntity: { "@id": `${siteUrl}/#person` },
      primaryImageOfPage: { "@id": `${siteUrl}/#personimage` },
      image: avatarUrl,
      thumbnailUrl: avatarUrl,
      description:
        "Fullstack engineer specialising in mobile, web and backend systems. Building scalable digital solutions with little hassle.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Witness H Musonza Portfolio",
      url: siteUrl,
      description:
        "Portfolio of Witness H Musonza, a full-stack software developer building mobile, web, and systems products.",
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Sage Tech",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/projects?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export function SiteStructuredData() {
  return (
    <script
      id="site-schema-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
    />
  );
}
