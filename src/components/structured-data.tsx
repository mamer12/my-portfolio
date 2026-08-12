import { education, roles, site, stackGroups } from "@/lib/content";

/**
 * JSON-LD for the page.
 *
 * Everything here is derived from `content.ts`, so the schema cannot drift from
 * what the page actually says. `alternateName` keeps the CV transliteration
 * discoverable without changing the display name.
 */
export function StructuredData() {
  const knowsAbout = stackGroups.flatMap((group) => group.items);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: site.altName,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone.replace(/\s/g, ""),
    description:
      "Senior Backend & AI Engineer with six years building production systems across telecom and fintech, currently serving a 10M+ subscriber base at Zain Iraq. Works AI-native with Claude Code, Gemini, and Codex.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baghdad",
      addressRegion: "Baghdad",
      addressCountry: "IQ",
    },
    sameAs: [site.socials.github, site.socials.linkedin],
    knowsAbout,
    knowsLanguage: [
      { "@type": "Language", name: "Arabic", alternateName: "ar" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Baghdad",
        addressCountry: "IQ",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: roles[0].company,
    },
    hasOccupation: roles.map((role) => ({
      "@type": "Occupation",
      name: role.title,
      occupationLocation: {
        "@type": "Place",
        name: role.location,
      },
      description: role.summary,
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: `${site.name} — Portfolio`,
    url: site.url,
    description:
      "Portfolio of a senior backend and AI engineer working on microservices, event-driven systems, LLM pipelines, and data at scale.",
    inLanguage: ["en", "ar"],
    author: { "@id": `${site.url}/#person` },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — Backend & AI Engineering`,
    description:
      "Backend, platform, and AI engineering: microservices, event-driven pipelines, PostgreSQL data architecture, LLM systems, and zero-downtime migrations.",
    provider: { "@id": `${site.url}/#person` },
    areaServed: "Worldwide",
    serviceType: [
      "Backend Development",
      "Microservices Architecture",
      "Event-Driven Architecture",
      "Database Design and Migration",
      "API Gateway Design",
      "System Integration",
      "AI-Native Development",
      "LLM Pipeline Engineering",
      "Agentic Workflow Design",
    ],
  };

  return (
    <>
      {[person, website, service].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Static, developer-authored objects — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
