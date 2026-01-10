export default function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Mustafa Al-Mosuli",
        "jobTitle": "Senior Backend Engineer",
        "url": "https://mustafaa.xyz",
        "email": "mamer.ma1234@gmail.com",
        "telephone": "+964-7810940050",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Baghdad",
            "addressCountry": "IQ"
        },
        "sameAs": [
            "https://github.com/mamer12",
            "https://www.linkedin.com/in/mamerma1234/"
        ],
        "knowsAbout": [
            "Backend Development",
            "Microservices Architecture",
            "FastAPI",
            "Python",
            "Node.js",
            "PostgreSQL",
            "Redis",
            "Docker",
            "AWS",
            "TypeScript",
            "REST API",
            "GraphQL"
        ],
        "description": "Senior Backend Engineer with 5+ years of experience architecting microservices, FastAPI platforms, and ERP integrations for high-transaction fintech and telecom systems.",
        "knowsLanguage": [
            { "@type": "Language", "name": "English", "alternateName": "en" },
            { "@type": "Language", "name": "Arabic", "alternateName": "ar" }
        ],
        "workLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Baghdad",
                "addressRegion": "Baghdad",
                "addressCountry": "IQ"
            }
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Mustafa Al-Mosuli Portfolio",
        "url": "https://mustafaa.xyz",
        "description": "Portfolio website showcasing backend engineering projects and expertise",
        "inLanguage": ["en", "ar"],
        "author": {
            "@type": "Person",
            "name": "Mustafa Al-Mosuli"
        }
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Mustafa Al-Mosuli - Backend Engineering Services",
        "description": "Expert backend engineering services specializing in microservices, FastAPI, and high-performance systems",
        "provider": {
            "@type": "Person",
            "name": "Mustafa Al-Mosuli"
        },
        "areaServed": "Worldwide",
        "serviceType": [
            "Backend Development",
            "Microservices Architecture",
            "API Development",
            "Database Design",
            "System Integration"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            />
        </>
    );
}
