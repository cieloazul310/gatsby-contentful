import * as React from 'react';
import useSiteMetadata from '../utils/useSiteMetadata';

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  const siteMetadata = useSiteMetadata();
  return (
    <header
      style={{
        background: '#fff',
        color: '#000',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)',
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
        <h1 style={{ fontSize: '1.6em', margin: '0 0 .2em 0' }}>{title}</h1>
        <span style={{ fontSize: '.8em' }}>{siteMetadata.title}</span>
      </div>
    </header>
  );
}

export default Header;
