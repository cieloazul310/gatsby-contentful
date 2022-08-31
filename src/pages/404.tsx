import * as React from 'react';
import Layout from '../layout';

function NotFoundPage() {
  return (
    <Layout title="404 Not Found">
      <p>404 Not Found</p>
    </Layout>
  );
}

export default NotFoundPage;

export function Head() {
  return <title>Not found</title>;
}
