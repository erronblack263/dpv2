const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Witness H Musonza",
  jobTitle: "Software Developer",
  url: "https://portfolio.sagetech.co.zw",
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
  url: "https://portfolio.sagetech.co.zw",
  description:
    "Portfolio of Witness H Musonza, a full-stack software developer building mobile, web, and systems products.",
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://portfolio.sagetech.co.zw/projects?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
    </>
  );
}
