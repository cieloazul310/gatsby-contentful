import * as path from 'path';
// import slugify from '@sindresorhus/slugify';
import type { CreatePagesArgs, Node } from 'gatsby';
import type { ContentfulPost } from './types';

// eslint-disable-next-line import/prefer-default-export
export async function createPages({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<{
    allContentfulPost: {
      nodes: Pick<ContentfulPost & Node, 'id' | 'contentful_id'>[];
    };
  }>(`
    query {
      allContentfulPost {
        nodes {
          id
          contentful_id
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }
  const posts = result.data?.allContentfulPost.nodes;
  posts?.forEach(({ id, contentful_id }) => {
    createPage({
      path: `/post/${contentful_id}`,
      component: path.resolve('./src/templates/contentful-post.tsx'),
      context: {
        id,
      },
    });
  });
}
