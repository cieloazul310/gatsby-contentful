import * as React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import useSiteMetadata from '../utils/useSiteMetadata';

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  const siteMetadata = useSiteMetadata();
  return (
    <Box width="100%" p={2} as="header">
      <Box
        bg="white"
        color="#000"
        width="100%"
        boxShadow="lg"
        rounded="md"
        display="flex"
        justifyContent="center"
      >
        <Box
          px={4}
          py={8}
          width="100%"
          maxW="2xl"
          display="flex"
          flexDirection="column"
        >
          <Heading as="h1" size="lg" mb={1}>
            {title}
          </Heading>
          <Text size="sm">{siteMetadata.title}</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
