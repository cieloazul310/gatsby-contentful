import * as React from 'react';
import useSiteMetadata from '../utils/useSiteMetadata';

type SeoProps = React.PropsWithChildren<{
  title: string;
  description?: string;
  image?: string;
}>;

function Seo({ title, description, image, children }: SeoProps) {
  const siteMetadata = useSiteMetadata();
  return (
    <>
      <title>{title}</title>
      <meta name="og:type" content="website" />
      <meta name="og:title" content={title ?? siteMetadata.title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={siteMetadata.title} />
      <meta
        name="twitter:title"
        content={
          title ? `${title} | ${siteMetadata.title}` : siteMetadata.title
        }
      />
      {description ? (
        <>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      ) : null}
      {image ? (
        <>
          <meta name="image" content={image} />
          <meta name="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      ) : null}
      {children}
    </>
  );
}

Seo.defaultProps = {
  image: undefined,
  description: undefined,
};

export default Seo;
