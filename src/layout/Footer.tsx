import * as React from 'react';
import { Link } from 'gatsby';
import useSiteMetadata from '../utils/useSiteMetadata';

function Footer() {
  const siteMetadata = useSiteMetadata();
  return (
    <footer
      style={{
        background: '#333',
        color: '#fff',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          padding: '32px 16px',
          width: '100%',
          maxWidth: 720,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={{ fontSize: '.8em' }}>
          <Link to="/" style={{ color: 'inherit' }}>
            {siteMetadata.title}
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
