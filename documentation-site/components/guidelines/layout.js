import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import Link from 'next/link';

function Layout({pages, children}: any) {
  const [css, theme] = useStyletron();
  return (
    <React.Fragment>
      <nav
        className={css({
          position: 'fixed',
          height: '100vh',
          width: '250px',
          overflowY: 'scroll',
          padding: '16px',
          ...theme.typography.LabelMedium,
        })}
      >
        {pages.length > 0
          ? pages.map(page => (
              <div key={page.id} className={css({marginBottom: '16px'})}>
                <div className={css({marginBottom: '8px'})}>{page.name}</div>
                {page.children.map(frame => {
                  // Convention: Only link to frames which start with a capital letter.
                  if (frame.visible !== false && frame.name.match(/^[A-Z]/)) {
                    return (
                      <div key={frame.id} className={css({marginLeft: '16px'})}>
                        <Link
                          href={`/guidelines/${frame.id.replace(':', '-')}`}
                          passHref
                        >
                          <StyledLink>{frame.name}</StyledLink>
                        </Link>
                      </div>
                    );
                  }
                })}
              </div>
            ))
          : null}
      </nav>
      <main className={css({marginLeft: '250px'})}>{children}</main>
    </React.Fragment>
  );
}

export default Layout;
