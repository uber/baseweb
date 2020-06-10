import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import Link from 'next/link';

import Logo from './logo.js';

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
          borderRightColor: theme.borders.border400.borderColor,
          borderRightStyle: theme.borders.border400.borderStyle,
          borderRightWidth: theme.borders.border400.borderWidth,
          ...theme.typography.LabelMedium,
        })}
      >
        <Logo />
        <div className={css({height: theme.sizing.scale1000})} />
        {pages.length > 0
          ? pages.map(page => (
              <div key={page.id} className={css({marginBottom: '16px'})}>
                <div className={css(theme.typography.LabelLarge)}>
                  {page.name}
                </div>
                <ul>
                  {page.children.map(frame => {
                    // Convention: Only link to frames which start with a capital letter.
                    if (frame.visible !== false && frame.name.match(/^[A-Z]/)) {
                      return (
                        <li key={frame.id}>
                          <Link
                            href={`/guidelines/${frame.id.replace(':', '-')}`}
                            passHref
                          >
                            <StyledLink>{frame.name}</StyledLink>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            ))
          : null}
      </nav>
      <main className={css({marginLeft: '250px'})}>{children}</main>
    </React.Fragment>
  );
}

export default Layout;
