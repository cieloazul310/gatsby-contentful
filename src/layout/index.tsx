import * as React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = React.PropsWithChildren<{
  title: string;
}>;

function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Header title={title} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <main style={{ padding: '64px 16px', width: '100%', maxWidth: 720 }}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
