import type { RenderRichTextData } from 'gatsby-source-contentful/rich-text';

export type SiteMetadata = {
  title: string;
  siteUrl: string;
};

export type ContentfulPost = {
  contentful_id: string;
  title: string;
  date: string;
  author: ContentfulAuthor;
  content: RenderRichTextData<{
    __typename: string;
    contentful_id: string;
  }>;
};

export type ContentfulAuthor = {
  name: string;
  description: string;
  slug: string;
};
