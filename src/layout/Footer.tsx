import * as React from 'react';
import { Link } from 'gatsby';
import { Box, Text } from '@chakra-ui/react';
import useSiteMetadata from '../utils/useSiteMetadata';

function Footer() {
  const siteMetadata = useSiteMetadata();
  return (
    <Box
      as="footer"
      bg="gray.700"
      color="#fff"
      width="100%"
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
        <Text size="sm">
          <Link to="/" style={{ color: 'inherit' }}>
            {siteMetadata.title}
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Footer;
