import * as React from 'react';

function Pre({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <pre
      className={className ?? undefined}
      style={{
        margin: '2em auto',
        padding: '2em',
        background: '#eee',
        borderRadius: '.2em',
        fontSize: '1.2em',
      }}
    >
      {children}
    </pre>
  );
}

Pre.defaultProps = {
  children: undefined,
  className: undefined,
};

function Code({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return className ? (
    <code>{children}</code>
  ) : (
    <code
      style={{
        background: '#eee',
        borderRadius: '.2em',
        fontSize: '1.2em',
        padding: '0 .2em',
      }}
    >
      {children}
    </code>
  );
}

Code.defaultProps = {
  children: undefined,
  className: undefined,
};

const mdxComponents = { pre: Pre, code: Code };

export default mdxComponents;
