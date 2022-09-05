import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';

type NavigationItem = {
  to: string;
  title?: string;
};

type NavigationButtonProps = {
  item: NavigationItem | null;
  variant: 'previous' | 'next';
};

function NavigationButton({ item, variant }: NavigationButtonProps) {
  if (!item) return null;

  const { to, title } = item;
  const isPrevious = variant === 'previous';

  return (
    <LinkBox
      p={2}
      display="flex"
      flexDirection={isPrevious ? 'row' : 'row-reverse'}
      justifyContent={isPrevious ? 'end' : 'start'}
      alignItems="center"
    >
      <Text>
        <LinkOverlay as={GatsbyLink} to={to}>
          {title ?? (isPrevious ? 'Previous' : 'Next')}
        </LinkOverlay>
      </Text>
      {isPrevious ? <ArrowRightIcon ml={2} /> : <ArrowLeftIcon mr={2} />}
    </LinkBox>
  );
}

type NavigationProps = {
  previous: NavigationItem | null;
  next: NavigationItem | null;
};

function Navigation({ previous, next }: NavigationProps) {
  return (
    <Box display="flex" flexDirection={['column']} flex="1 1" my={4}>
      <NavigationButton item={next} variant="next" />
      <NavigationButton item={previous} variant="previous" />
    </Box>
  );
}

export default Navigation;
