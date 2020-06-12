import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import {Navigation} from 'baseui/side-navigation';
import Link from 'next/link';

import Logo from './logo.js';

function _nav(pages) {
  let nav = [];
  pages.forEach(page => {
    const params = {
      itemId: page.id,
      title: page.name,
    };

    let subNav = [];
    page.children.forEach(frame => {
      if (frame.visible !== false && frame.name.match(/^[A-Z]/)) {
        subNav.push({
          itemId: `/guidelines/${frame.id.replace(':', '-')}`,
          title: frame.name,
        });
      }
    });

    if (subNav.length) params.subNav = subNav;

    nav.push(params);
  });
  return nav;
}

function Layout({pages, node = '', children}: any) {
  const [css, theme] = useStyletron();
  return (
    <React.Fragment>
      <nav
        className={css({
          position: 'fixed',
          height: '100vh',
          width: '300px',
          overflowY: 'scroll',
          ...theme.typography.LabelMedium,
        })}
      >
        <div
          className={css({
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '24px',
            paddingTop: '20px',
          })}
        >
          <Logo />
        </div>
        <div className={css({height: theme.sizing.scale800})} />
        <Navigation items={_nav(pages)} activeItemId={`/guidelines/${node}`} />
      </nav>
      <main className={css({marginLeft: '300px'})}>{children}</main>
    </React.Fragment>
  );
}

export default Layout;
