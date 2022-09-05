import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { Stack } from '@chakra-ui/react';
import Layout from '../layout';
import PostListItem from '../components/PostListItem';
import Seo from '../components/Seo';
import type { ContentfulPost } from '../../types';

type ArchivePageData = {
  allContentfulPost: {
    nodes: Pick<ContentfulPost, 'contentful_id' | 'date' | 'title'>[];
  };
};

type ArchivePageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  basePath: string;
  totalCount: number;
};

type ArchiveTemplateProps = PageProps<ArchivePageData, ArchivePageContext>;

function ArchiveTemplate({ pageContext, data }: ArchiveTemplateProps) {
  const { numPages, currentPage } = pageContext;
  const { nodes } = data.allContentfulPost;
  const title =
    numPages === 1 ? `Archive` : `Archive (${currentPage}/${numPages})`;

  return (
    <Layout title={title}>
      <Stack spacing={2}>
        {nodes.map((post) => (
          <PostListItem key={post.contentful_id} post={post} />
        ))}
      </Stack>
    </Layout>
  );
}

export default ArchiveTemplate;

export function Head({
  pageContext,
}: HeadProps<ArchivePageData, ArchivePageContext>) {
  const { numPages, currentPage } = pageContext;
  const title =
    numPages === 1 ? `Archive` : `Archive (${currentPage}/${numPages})`;
  return <Seo title={title} />;
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        title
        contentful_id
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
