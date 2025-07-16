import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
  title = "MISSION | G.A.I.A.", 
  description = "Mission: G.A.I.A. is a dynamic edtech platform blending gamified learning with real-world environmental challenges. Empowering 9-12 year-olds with interactive hero training and global missions to foster ecoliteracy and environmental leadership.",
  image = "/logo192.png",
  url = "",
  type = "website",
  children,
  noindex = false,
  canonical = null
}) => {

  const currentDomain = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://missiongaia.com';

  const fullUrl = `${currentDomain}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${currentDomain}${image}`;

  // Clean title for better SEO
  const cleanTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  const cleanDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;

  return (
    <Helmet>
      <title>{cleanTitle}</title>
      <meta name="description" content={cleanDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {canonical && <link rel="canonical" href={canonical} />}
      {!canonical && url && <link rel="canonical" href={fullUrl} />}
      
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Mission: G.A.I.A." />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={cleanTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@missiongaia" /> 
      <meta name="twitter:creator" content="@missiongaia" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Mission: G.A.I.A. Team" />
      <meta name="keywords" content="environmental education, kids games, climate change education, interactive learning, STEM education, sustainability, ecology, green education, mission gaia" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Mobile/App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Mission: G.A.I.A." />
      
      {/* Theme Colors */}
      <meta name="theme-color" content="#16caca" />
      <meta name="msapplication-navbutton-color" content="#16caca" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preconnect to improve performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      
      {/* Structured Data for Educational Content */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Mission: G.A.I.A.",
          "description": cleanDescription,
          "url": fullUrl,
          "logo": fullImageUrl,
          "sameAs": [
            // "https://facebook.com/missiongaia",
            // "https://twitter.com/missiongaia",
            // "https://instagram.com/missiongaia"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@missiongaia.com"
          },
          "educationalCredentialAwarded": "Environmental Hero Certification",
          "educationalLevel": "Elementary School",
          "teaches": [
            "Environmental Science",
            "Climate Change",
            "Sustainability",
            "Ecology"
          ]
        })}
      </script>
      
      {children}
    </Helmet>
  );
};

// export const SEO = ({ title, description, image }) => {
//   return (
//     <head>
//       <title></title>
//       <meta property="og:type" content="website" />
//       <meta property="og:site_name" content="MISSION G.A.I.A" />
//       <meta property="og:url" content="https://test-cyberheros.netlify.app" />
//       <meta property="og:title" content={title} />
//       <meta property="og:image" content={image} />

//       <meta property="og:description" content={description} />
//       <meta property="description" content={description} />
//     </head>
//   );
// };
