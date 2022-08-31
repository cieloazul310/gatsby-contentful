import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
// import { MDXProvider } from '@mdx-js/react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../layout';
import type { ContentfulPost } from '../../types';
// import mdxComponents from '../components/mdxComponents';
// import shortcodes from '../components/shortcodes';

type PageContext = {
  frontmatter: {
    title: string | null;
  } | null;
};

type PageData = {
  contentfulPost: ContentfulPost;
};

type ContentfulPostTemplateProps = React.PropsWithChildren<
  PageProps<PageData, PageContext>
>;

function ContentfulPostTemplate({
  data
}: ContentfulPostTemplateProps) {
  const { contentfulPost } = data;
  const { title, date, content } = contentfulPost;

  return (
    <Layout title={title}>
      <article>
        {renderRichText(content)}
      </article>
    </Layout>
  );
}

export default ContentfulPostTemplate;

export const query = graphql`
  query ($id: String!) {
    contentfulPost(id: { eq: $id }) {
      date(formatString: "YYYY-MM-DD")
      title
      content {
        raw
      }
    }
  }
`;
