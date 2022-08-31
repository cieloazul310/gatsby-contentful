import * as React from 'react';
import type { PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../layout';
import mdxComponents from '../components/mdxComponents';
import shortcodes from '../components/shortcodes';

type PageContext = {
  frontmatter: {
    title: string | null;
  } | null;
};

type MdxTemplateProps = React.PropsWithChildren<PageProps<null, PageContext>>;

function MdxTemplate({ children, pageContext }: MdxTemplateProps) {
  const { frontmatter } = pageContext;

  return (
    <Layout title={frontmatter?.title ?? 'Mdx Page'}>
      <article>
        <MDXProvider components={{ ...mdxComponents, ...shortcodes }}>
          {children}
        </MDXProvider>
      </article>
    </Layout>
  );
}

export default MdxTemplate;
