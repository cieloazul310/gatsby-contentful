import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Stack } from '@chakra-ui/react';
import PostListItem from './PostListItem';
import type { ContentfulPost } from '../../types';

type RecentPostsData = {
  allContentfulPost: {
    nodes: Pick<ContentfulPost, 'contentful_id' | 'date' | 'title'>[];
  };
}

function RecentPosts() {
  const { allContentfulPost } = useStaticQuery<RecentPostsData>(graphql`
    query {
      allContentfulPost(sort: {fields: date, order: DESC}, limit: 10) {
        nodes {
          title
          date(formatString: "YYYY-MM-DD")
          contentful_id
        }
      }
    }
  `);
  return (
    <Stack my={8} spacing={2}>
      {allContentfulPost.nodes.map((post) => (
        <PostListItem post={post} key={post.contentful_id} />
      ))}
    </Stack>
  );
}

export default RecentPosts;
