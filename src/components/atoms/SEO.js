export const SEO = ({ title, description, image }) => {
  return (
    <head>
      <title></title>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MISSION G.A.I.A" />
      <meta property="og:url" content="https://test-cyberheros.netlify.app" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />

      <meta property="og:description" content={description} />
      <meta property="description" content={description} />
    </head>
  );
};
