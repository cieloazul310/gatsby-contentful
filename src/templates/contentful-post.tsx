import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import { Text } from '@chakra-ui/react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import type { Options } from '@contentful/rich-text-react-renderer';
import Layout from '../layout';
import Seo from '../components/Seo';
import type { ContentfulPost } from '../../types';
import mdxComponents from '../components/mdxComponents';

type PageContext = {
  frontmatter: {
    title: string | null;
  } | null;
};

type PageData = {
  contentfulPost: ContentfulPost;
};

function isGatsbyImageData(data: any): data is IGatsbyImageData {
  return typeof data === 'object' && data?.images && data?.layout;
}

const options: Options = {
  renderMark: {
    [MARKS.CODE]: (text) => (
      <Text as="code" bg="gray.100" rounded="sm" px={2}>
        {text}
      </Text>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => mdxComponents.p({ children }),
    [BLOCKS.HEADING_1]: (node, children) => mdxComponents.h1({ children }),
    [BLOCKS.HEADING_2]: (node, children) => mdxComponents.h2({ children }),
    [BLOCKS.HEADING_3]: (node, children) => mdxComponents.h3({ children }),
    [BLOCKS.HEADING_4]: (node, children) => mdxComponents.h4({ children }),
    [BLOCKS.HEADING_5]: (node, children) => mdxComponents.h5({ children }),
    [BLOCKS.HEADING_6]: (node, children) => mdxComponents.h6({ children }),
    [BLOCKS.UL_LIST]: (node, children) => mdxComponents.ul({ children }),
    [BLOCKS.OL_LIST]: (node, children) => mdxComponents.ol({ children }),
    [BLOCKS.LIST_ITEM]: (node, children) => mdxComponents.li({ children }),
    'embedded-asset-block': (node) => {
      const { data } = node;
      const { gatsbyImageData } = data.target;
      if (!isGatsbyImageData(gatsbyImageData)) {
        // asset is not an image
        return null;
      }
      return <GatsbyImage image={gatsbyImageData} alt="Image" />;
    },
  },
};

type ContentfulPostTemplateProps = React.PropsWithChildren<
  PageProps<PageData, PageContext>
>;

function ContentfulPostTemplate({ data }: ContentfulPostTemplateProps) {
  const { contentfulPost } = data;
  const { title, date, content } = contentfulPost;

  return (
    <Layout title={title}>
      <article>{renderRichText(content, options)}</article>
    </Layout>
  );
}

export default ContentfulPostTemplate;

export function Head({ data }: HeadProps<PageData>) {
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
