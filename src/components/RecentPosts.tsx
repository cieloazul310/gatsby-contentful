import * as React from 'react';
import { Link as GatsbyLink, graphql, useStaticQuery } from 'gatsby';
import { Box, LinkBox, LinkOverlay, Heading, Text } from '@chakra-ui/react';
import { ContentfulPost } from '../../types';

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
    <Box my={8}>
      {allContentfulPost.nodes.map(({ title, date, contentful_id }) => (
        <LinkBox key={contentful_id} as="article" p="5" borderWidth="1px" rounded="md">
          <Box as="time" dateTime={date}>
            {date}
          </Box>
          <Heading size="md" my="2">
            <LinkOverlay as={GatsbyLink} to={`/post/${contentful_id}/`}>
              {title}
            </LinkOverlay>
          </Heading>
          <Text mb="3">
            Catch up on what’s been cookin’ at Smashing and explore some of the
            most popular community resources.
          </Text>
        </LinkBox>
      ))}
    </Box>
  );
}

export default RecentPosts;
