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
  const postsPerPage = 20;

  const result = await graphql<{
    allContentfulPost: {
      nodes: Pick<ContentfulPost & Node, 'id' | 'contentful_id'>[];
      totalCount: number;
    };
  }>(`
    query {
      allContentfulPost(sort: {fields: date, order: DESC}) {
        nodes {
          id
          contentful_id
        }
        totalCount
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  // create pages for each post
  const posts = result.data?.allContentfulPost?.nodes;
  if (posts) {
    posts.forEach(({ id, contentful_id }, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].id;
      const next = index === 0 ? null : posts[index - 1].id;

      createPage({
        path: `/post/${contentful_id}/`,
        component: path.resolve('./src/templates/contentful-post.tsx'),
        context: {
          id,
          previous,
          next,
        },
      });
    });

    // create pages for post list
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/archive/' : `/archive/${i + 1}/`,
        component: path.resolve('./src/templates/archive.tsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          basePath: '/archive/',
          totalCount: result.data?.allContentfulPost?.totalCount ?? 0,
        },
      });
    });
  }
}
