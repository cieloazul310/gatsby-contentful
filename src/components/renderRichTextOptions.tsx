import * as React from 'react';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import { Box, ListItem, Tr, Td } from '@chakra-ui/react';
import { BLOCKS, MARKS, Document } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  type Options,
} from '@contentful/rich-text-react-renderer';
import mdxComponents from './mdxComponents';

function isGatsbyImageData(data: any): data is IGatsbyImageData {
  return typeof data === 'object' && data?.images && data?.layout;
}

const renderMark = {
  [MARKS.CODE]: (children: React.ReactNode) => mdxComponents.code({ children }),
};

const renderRichTextOptions: Options = {
  renderMark,
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => mdxComponents.p({ children }),
    [BLOCKS.HEADING_1]: (node, children) => mdxComponents.h1({ children }),
    [BLOCKS.HEADING_2]: (node, children) => mdxComponents.h2({ children }),
    [BLOCKS.HEADING_3]: (node, children) => mdxComponents.h3({ children }),
    [BLOCKS.HEADING_4]: (node, children) => mdxComponents.h4({ children }),
    [BLOCKS.HEADING_5]: (node, children) => mdxComponents.h5({ children }),
    [BLOCKS.HEADING_6]: (node, children) => mdxComponents.h6({ children }),
    [BLOCKS.UL_LIST]: (node, children) => mdxComponents.ul({ children }),
    [BLOCKS.OL_LIST]: (node, children) => mdxComponents.ol({ children }),
    [BLOCKS.LIST_ITEM]: (node) => {
      const transformedChildren = documentToReactComponents(node as Document, {
        renderMark,
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => children,
          [BLOCKS.LIST_ITEM]: (_node, children) => children,
        },
      });
      return <ListItem>{transformedChildren}</ListItem>;
    },
    [BLOCKS.TABLE]: (node, children) => mdxComponents.table({ children }),
    [BLOCKS.TABLE_ROW]: (node, children) => <Tr>{children}</Tr>,
    [BLOCKS.TABLE_HEADER_CELL]: (node) => {
      const transformedChildren = documentToReactComponents(node as Document, {
        renderMark,
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => children,
          [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => children,
        },
      });
      return <Td as="th">{transformedChildren}</Td>;
    },
    [BLOCKS.TABLE_CELL]: (node) => {
      const transformedChildren = documentToReactComponents(node as Document, {
        renderMark,
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => children,
          [BLOCKS.TABLE_CELL]: (_node, children) => children,
        },
      });
      return <Td>{transformedChildren}</Td>;
    },
    'embedded-asset-block': (node) => {
      const { data } = node;
      const { gatsbyImageData } = data.target;
      if (!isGatsbyImageData(gatsbyImageData)) {
        // asset is not an image
        return null;
      }
      return (
        <Box my={8}>
          <GatsbyImage image={gatsbyImageData} alt="Image" />
        </Box>
      );
    },
  },
};

export default renderRichTextOptions;
