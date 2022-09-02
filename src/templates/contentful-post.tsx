import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../layout';
import Seo from '../components/Seo';
import RecentPosts from '../components/RecentPosts';
import type { ContentfulPost } from '../../types';
import renderRichTextOptions from '../components/renderRichTextOptions';

type ContentfulPageData = {
  contentfulPost: ContentfulPost;
};

type ContentfulPostTemplateProps = React.PropsWithChildren<
  PageProps<ContentfulPageData, null>
>;

function ContentfulPostTemplate({ data }: ContentfulPostTemplateProps) {
  const { contentfulPost } = data;
  const { title, date, content } = contentfulPost;

  return (
    <Layout title={title}>
      <article>{renderRichText(content, renderRichTextOptions)}</article>
      <aside>
        <RecentPosts />
      </aside>
    </Layout>
  );
}

export default ContentfulPostTemplate;

export function Head({ data }: HeadProps<ContentfulPageData>) {
  const { contentfulPost } = data;
  return <Seo title={contentfulPost.title} />;
}

export const query = graphql`
  query ($id: String!) {
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
  }
`;
