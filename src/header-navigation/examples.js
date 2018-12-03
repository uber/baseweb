/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';
import {withProps} from '../helpers';
import {Button} from '../button';
import {StatefulMenu as Menu, KEY_STRINGS} from '../menu';
import {StatefulSelect as Search} from '../select';
import {styled} from '../styles';
import COLORS from '../select/examples-colors';
import {HamburgerIcon} from './examples-icons';

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from './index';
import tests from './examples-list';
import {TYPE} from '../select';

const Link = withProps(
  styled('a', props => ({
    ':hover': {color: props.$theme.colors.primary400},
  })),
  {tabIndex: '0'},
);
// $FlowFixMe
Link.displayName = 'Link';

const Hamburger = styled('div', props => ({
  lineHeight: 'initial',
}));
Hamburger.displayName = 'Hamburger';

const StyledHamburgerIcon = styled('span', props => ({
  ':after': {
    content: `url('data:image/svg+xml;utf8,${HamburgerIcon(
      props.$theme.colors.foreground,
    )}');`,
  },
}));

const ExtraStyledNavigationList = styled(NavigationList, props => ({
  backgroundColor: 'red',
}));

let ITEMS = [];
for (let i = 0; i < 100; i++) {
  ITEMS.push({label: `Item ${i}`});
}
const options = {
  options: COLORS,
  labelKey: 'id',
  valueKey: 'color',
  placeholder: 'Choose a color',
  maxDropdownHeight: '300px',
};
class MenuContainer extends React.Component<
  {isOpen: boolean, align: string},
  {isOpen: boolean},
> {
  static defaultProps = {
    isOpen: false,
    align: '',
  };
  state = {
    isOpen: this.props.isOpen,
  };
  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <React.Fragment>
        <Hamburger
          tabIndex="0"
          aria-label="Navigation menu"
          onKeyDown={e => {
            switch (e.key) {
              case KEY_STRINGS.ArrowDown:
              case KEY_STRINGS.Space:
              case KEY_STRINGS.Enter:
                this.toggleMenu();
                return;
            }
          }}
          onClick={() => this.toggleMenu()}
        >
          <StyledHamburgerIcon />
        </Hamburger>
        {this.state.isOpen && (
          <Menu
            items={ITEMS}
            overrides={{
              List: {
                style: {
                  cursor: 'pointer',
                  position: 'absolute',
                  height: '90vh',
                  right: this.props.align === ALIGN.right ? '0' : 'initial',
                },
              },
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default {
  [tests.HEADER_NAVIGATION_WITH_MENU_ELEMENT]: () => {
    return (
      <React.Fragment>
        <div style={{marginTop: '50px'}} />
        <HeaderNavigation>
          <NavigationList align={ALIGN.left}>
            <NavigationItem>
              <MenuContainer />
            </NavigationItem>
            <NavigationItem>Uber</NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.center} />
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Link>Tab Link One</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Two</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Three</Link>
            </NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Button>Get started</Button>
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </React.Fragment>
    );
  },
  [tests.HEADER_NAVIGATION_WITH_RIGHT_MENU]: () => {
    return (
      <React.Fragment>
        <div style={{marginTop: '50px'}} />
        <HeaderNavigation>
          <NavigationList align={ALIGN.center}>
            <NavigationItem>
              <Link>Tab Link One</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Two</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Three</Link>
            </NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>Uber</NavigationItem>
            <NavigationItem>
              <MenuContainer align={ALIGN.right} />
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </React.Fragment>
    );
  },
  [tests.HEADER_NAVIGATION_WITH_OVERRIDES]: () => {
    return (
      <React.Fragment>
        <div style={{marginTop: '50px'}} />
        <HeaderNavigation
          overrides={{Root: {style: {backgroundColor: 'lightblue'}}}}
        >
          <NavigationList align={ALIGN.left}>
            <NavigationItem>
              <MenuContainer />
            </NavigationItem>
            <NavigationItem>Uber</NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Link>Tab Link One</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Two</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Three</Link>
            </NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Button>Get started</Button>
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </React.Fragment>
    );
  },
  [tests.HEADER_NAVIGATION_SEARCH_BAR]: () => {
    return (
      <React.Fragment>
        <div style={{marginTop: '50px'}} />
        <HeaderNavigation>
          <NavigationList align={ALIGN.left}>
            <NavigationItem>
              <MenuContainer />
            </NavigationItem>
            <NavigationItem>Uber</NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.center}>
            <NavigationItem>
              <Link>Tab Link One</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Two</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Tab Link Three</Link>
            </NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem style={{width: '300px'}}>
              <Search
                {...options}
                type={TYPE.search}
                getOptionLabel={props => props.option.id || null}
                onChange={() => {}}
                rows={8}
                multi
              />
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </React.Fragment>
    );
  },
  [tests.HEADER_NAVIGATION_DIFFERENT_ALIGNMENTS]: () => {
    return (
      <React.Fragment>
        <div style={{marginTop: '50px'}} />
        <HeaderNavigation>
          <NavigationList align={ALIGN.left}>
            <NavigationItem>Uber</NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.center}>
            <NavigationItem>
              <Link>Centered Tab Link One</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Centered Tab Link Two</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Centered Tab Link Three</Link>
            </NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Link>Right Aligned Link</Link>
            </NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Button>Get started</Button>
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </React.Fragment>
    );
  },
  [tests.HEADER_NAVIGATION_STYLED_NAV_LIST]: () => {
    return (
      <React.Fragment>
        <div style={{marginTop: '50px'}} />
        <HeaderNavigation>
          <ExtraStyledNavigationList align={ALIGN.left}>
            <NavigationItem>Uber</NavigationItem>
          </ExtraStyledNavigationList>
          <ExtraStyledNavigationList align={ALIGN.center}>
            <NavigationItem>
              <Link>Centered Tab Link One</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Centered Tab Link Two</Link>
            </NavigationItem>
            <NavigationItem>
              <Link>Centered Tab Link Three</Link>
            </NavigationItem>
          </ExtraStyledNavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Link>Right Aligned Link</Link>
            </NavigationItem>
          </NavigationList>
          <NavigationList align={ALIGN.right}>
            <NavigationItem>
              <Button>Get started</Button>
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </React.Fragment>
    );
  },
};
