import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, LinkBox, LinkOverlay, Heading, Text } from '@chakra-ui/react';
import type { ContentfulPost } from '../../types';

type PostListItemProps = {
  post: Pick<ContentfulPost, 'contentful_id' | 'date' | 'title'>;
};

function PostListItem({ post }: PostListItemProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, date, contentful_id } = post;
  return (
    <LinkBox
      key={contentful_id}
      as="article"
      p="5"
      borderWidth="1px"
      rounded="md"
    >
      <Box as="time" dateTime={date}>
        {date}
      </Box>
      <Heading size="md" my="2">
        <LinkOverlay as={GatsbyLink} to={`/post/${contentful_id}/`}>
          {title}
        </LinkOverlay>
      </Heading>
      <Text mb="3">
        Catch up on what&apos;s been cookin&apos; at Smashing and explore some
        of the most popular community resources.
      </Text>
    </LinkBox>
  );
}

export default PostListItem;
