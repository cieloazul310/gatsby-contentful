import type { RenderRichTextData } from 'gatsby-source-contentful/rich-text';

export type SiteMetadata = {
  title: string;
  siteUrl: string;
};

export type ContentfulPost = {
  contentful_id: string;
  title: string;
  date: string;
  content: RenderRichTextData<{
    __typename: string;
    contentful_id: string;
  }>;
};
