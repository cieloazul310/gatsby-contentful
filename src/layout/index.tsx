import * as React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = React.PropsWithChildren<{
  title: string;
}>;

function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Header title={title} />
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <Box as="main" px={4} py={16} width="100%" maxWidth={720}>
          <main>{children}</main>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Layout;
