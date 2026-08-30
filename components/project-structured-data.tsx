type ProjectSchemaInput = {
  name: string;
  description: string;
  url: string;
  category: string;
  tech: string[];
};

export function ProjectStructuredData({
  projects,
}: {
  projects: ProjectSchemaInput[];
}) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Witness H Musonza Projects",
    description:
      "Portfolio projects covering AI, mobile, full-stack, and systems engineering work by Witness H Musonza.",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.name,
        applicationCategory: project.category,
        operatingSystem: "Web, Mobile, Desktop",
        description: project.description,
        url: `https://portfolio.sagetech.co.zw${project.url}`,
        keywords: project.tech.join(", "),
        author: {
          "@type": "Person",
          name: "Witness H Musonza",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}
