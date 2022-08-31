import { graphql, useStaticQuery } from 'gatsby';
import type { SiteMetadata } from '../../types';

type SiteMetadataData = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

function useSiteMetadata() {
  const { site } = useStaticQuery<SiteMetadataData>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);
  return site.siteMetadata;
}

export default useSiteMetadata;
