import * as React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Link,
  Code,
} from '@chakra-ui/react';

function Pre({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Box
      as="pre"
      className={className ?? undefined}
      mb={8}
      p={4}
      rounded="md"
      bg="gray.100"
      overflow="auto"
    >
      {children}
    </Box>
  );
}

Pre.defaultProps = {
  children: undefined,
  className: undefined,
};

function H1(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Heading as="h1" {...props} />;
}

function H2(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Heading as="h2" size="lg" mb={8} {...props} />;
}

function H3(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Heading as="h3" size="lg" mb={6} {...props} />;
}

function H4(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Heading as="h4" size="md" mb={4} {...props} />;
}

function H5(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Heading as="h5" size="md" mb={4} {...props} />;
}

function H6(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Heading as="h6" size="sm" mb={4} {...props} />;
}

function Paragraph(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text mb={8} {...props} />;
}

function Ul(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <UnorderedList mb={8} {...props} />;
}

function Ol(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <OrderedList mb={8} {...props} />;
}

function ALink(props: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Link isExternal {...props} />;
}

const mdxComponents = {
  pre: Pre,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  ul: Ul,
  ol: Ol,
  li: ListItem,
  a: ALink,
};

export default mdxComponents;
