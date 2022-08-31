import * as React from 'react';
import { Link as GatsbyLink, type GatsbyLinkProps } from 'gatsby';
import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type LinkProps<TState> = GatsbyLinkProps<TState> & ChakraLinkProps; 

function Link<TState extends Record<string, unknown>>(props: LinkProps<TState>) {
  // eslint-disable-next-line 
  return <ChakraLink as={GatsbyLink} {...props} />
}

export default Link;
