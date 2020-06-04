import * as React from 'react';
import {useStyletron} from 'baseui';

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
          borderRight: 'solid 1px black',
        })}
      >
        {pages.length > 0
          ? pages.map(page => (
              <div key={page.id} className={css({marginBottom: '16px'})}>
                <div>{page.name}</div>
                {page.children.map(frame => {
                  // Convention: Only link to frames which start with a capital letter.
                  if (frame.visible !== false && frame.name.match(/^[A-Z]/)) {
                    return (
                      <div key={frame.id} className={css({marginLeft: '16px'})}>
                        <a href={`/guidelines/${frame.id.replace(':', '-')}`}>
                          {frame.name}
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            ))
          : null}
      </nav>
      <main
        className={css({
          marginLeft: '250px',
          background: theme.colors.backgroundTertiary,
          minHeight: '100vh',
          padding: '48px',
          overflow: 'scroll',
          position: 'relative',
        })}
      >
        {children}
      </main>
    </React.Fragment>
  );
}

export default Layout;
