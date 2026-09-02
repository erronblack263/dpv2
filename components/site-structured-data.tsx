const siteUrl = "https://portfolio.sagetech.co.zw";
const avatarUrl =
  "https://res.cloudinary.com/virfpzu4/image/upload/v1788345225/20260522_194525_b3pg2a.jpg";
const logoUrl =
  process.env.NEXT_PUBLIC_CLOUDINARY_LOGO_URL ||
  "https://portfolio.sagetech.co.zw/sage-logo.png";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Witness H Musonza",
  jobTitle: "Software Developer",
  url: siteUrl,
  image: avatarUrl,
  sameAs: ["https://www.linkedin.com/in/witnessmusonza"],
  knowsAbout: [
    "Full Stack Development",
    "Web Applications",
    "Mobile Applications",
    "Backend Systems",
    "Systems Programming",
    "AI Products",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
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
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Witness H Musonza | Software Developer",
  url: siteUrl,
  description:
    "Fullstack engineer specialising in mobile, web and backend systems. Building scalable digital solutions with little hassle.",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: avatarUrl,
    contentUrl: avatarUrl,
    caption: "Witness H Musonza - Software Developer",
    width: 600,
    height: 600,
  },
  thumbnailUrl: avatarUrl,
  image: avatarUrl,
};

export function SiteStructuredData() {
  return (
    <>
      <script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
