import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { HStack, Button } from '@chakra-ui/react';

type PaginationProps = {
  numPages: number;
  currentPage: number;
  basePath: string;
};

function Pagination({ numPages, currentPage, basePath }: PaginationProps) {
  if (numPages === 1) return null;

  return (
    <HStack spacing={2} justifyContent="center" />
  );
}

export default Pagination;
