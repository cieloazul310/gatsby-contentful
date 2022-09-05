import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../layout';
import Seo from '../components/Seo';
import RecentPosts from '../components/RecentPosts';
import Navigation from '../components/Navigation';
import renderRichTextOptions from '../components/renderRichTextOptions';
import type { ContentfulPost } from '../../types';


type ContentfulPostPageData = {
  contentfulPost: Pick<ContentfulPost, 'date' | 'title' | 'content'>;
  previous: Pick<ContentfulPost, 'title' | 'contentful_id'> | null;
  next: Pick<ContentfulPost, 'title' | 'contentful_id'> | null;
};

type ContentfulPostPageContext = {
  previous: string | null;
  next: string | null;
};

type ContentfulPostTemplateProps = React.PropsWithChildren<
  PageProps<ContentfulPostPageData, ContentfulPostPageContext>
>;

function ContentfulPostTemplate({ data }: ContentfulPostTemplateProps) {
  const { contentfulPost, previous, next } = data;
  const { title, date, content } = contentfulPost;

  return (
    <Layout title={title}>
      <article>{renderRichText(content, renderRichTextOptions)}</article>
      <aside>
        <RecentPosts />
        <Navigation
          previous={
            previous
              ? { ...previous, to: `/post/${previous.contentful_id}/` }
              : null
          }
          next={
            next
              ? { ...next, to: `/post/${next.contentful_id}/` }
              : null
          }
        />
      </aside>
    </Layout>
  );
}

export default ContentfulPostTemplate;

export function Head({ data }: HeadProps<ContentfulPostPageData>) {
  const { contentfulPost } = data;
  return <Seo title={contentfulPost.title} />;
}

export const query = graphql`
  query ($id: String!, $previous: String, $next: String) {
    contentfulPost(id: { eq: $id }) {
      date(formatString: "YYYY-MM-DD")
      title
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData
          }
          contentful_id
        }
      }
    }
    previous: contentfulPost(id: { eq: $previous }) {
      title
      contentful_id
    }
    next: contentfulPost(id: { eq: $next }) {
      title
      contentful_id
    }
  }
`;
