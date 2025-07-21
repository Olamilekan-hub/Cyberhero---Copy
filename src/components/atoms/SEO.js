import { Helmet } from 'react-helmet';

export const SEO = ({ 
  title = "MISSION G.A.I.A. - Environmental Education Gaming Platform",
  description = "Mission: G.A.I.A. is a dynamic edtech platform blending gamified learning with real-world environmental challenges. Interactive hero training and global missions for 9-12 year-olds, fostering ecoliteracy and social-emotional growth.",
  image = "https://missiongaia.com/assets/og-image.png",
  url = "",
  type = "website",
  keywords = "environmental education, gamified learning, kids education, climate change, sustainability, STEM education, ecoliteracy",
  author = "Evolutionary Guidance Media R&D Inc.",
  canonical = "",
  noindex = false
}) => {
  // Ensure we have the full URL
  const baseUrl = "https://missiongaia.com";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonicalUrl = canonical || fullUrl;
  
  // Ensure image has full URL
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  // Clean title for better SEO
  const cleanTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  const cleanDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;

  return (
    <Helmet>
      {/* Essential Meta Tags */}
      <title>{cleanTitle}</title>
      <meta name="description" content={cleanDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mission G.A.I.A." />
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={cleanTitle} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MissionGAIA" />
      <meta name="twitter:creator" content="@MissionGAIA" />
      <meta name="twitter:title" content={cleanTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={cleanTitle} />
      
      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Theme and App Meta */}
      <meta name="theme-color" content="#16caca" />
      <meta name="msapplication-TileColor" content="#16caca" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data - Educational Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Mission G.A.I.A.",
          "description": cleanDescription,
          "url": baseUrl,
          "logo": `${baseUrl}/assets/logo.png`,
          "sameAs": [
            "https://facebook.com/missiongaia",
            "https://twitter.com/missiongaia",
            "https://instagram.com/missiongaia"
          ],
          "founder": {
            "@type": "Organization",
            "name": "Evolutionary Guidance Media R&D Inc.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "203 Hudson Street",
              "addressLocality": "New York",
              "addressRegion": "NY",
              "postalCode": "10013",
              "addressCountry": "US"
            }
          },
          "educationalLevel": "Elementary School",
          "audience": {
            "@type": "EducationalAudience",
            "educationalRole": "student",
            "audienceType": "children aged 9-12"
          },
          "teaches": [
            "Environmental Science",
            "Climate Change",
            "Sustainability",
            "STEM Education",
            "Social-Emotional Learning"
          ]
        })}
      </script>
      
      {/* Website/WebPage Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "website" ? "WebSite" : "WebPage",
          "name": cleanTitle,
          "description": cleanDescription,
          "url": fullUrl,
          "image": fullImageUrl,
          "publisher": {
            "@type": "Organization",
            "name": "Mission G.A.I.A.",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/assets/logo.png`
            }
          },
          ...(type === "website" && {
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })
        })}
      </script>
    </Helmet>
  );
};