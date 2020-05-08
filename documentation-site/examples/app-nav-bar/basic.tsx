import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import {Button} from 'baseui/button';
import {Layer} from 'baseui/layer';
import {
  ChevronDown,
  Delete,
  Overflow as UserIcon,
  Upload as Icon,
} from 'baseui/icon';
import {
  Unstable_AppNavBar as AppNavBar,
  POSITION,
} from 'baseui/app-nav-bar';

function renderItem(item: any) {
  return item.label;
}

const MAIN_NAV = [
  {
    icon: Icon,
    item: {label: 'Primary alpha1'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: Icon,
    item: {label: 'Primary alpha2'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: ChevronDown,
    item: {label: 'Primary alpha3'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    navPosition: {desktop: POSITION.horizontal},
    nav: [
      {
        icon: Icon,
        item: {label: 'Secondary menu1'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
        nav: [
          {
            icon: Icon,
            item: {label: 'Tertiary menu1'},
            mapItemToNode: renderItem,
            mapItemToString: renderItem,
          },
          {
            icon: Icon,
            item: {label: 'Tertiary menu2'},
            mapItemToNode: renderItem,
            mapItemToString: renderItem,
          },
          {
            icon: Icon,
            item: {label: 'Secondary menu3'},
            mapItemToNode: renderItem,
            mapItemToString: renderItem,
          },
          {
            icon: Icon,
            item: {label: 'Secondary menu4'},
            mapItemToNode: renderItem,
            mapItemToString: renderItem,
          },
        ],
      },
      {
        icon: Icon,
        item: {label: 'Secondary menu2'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
    ],
  },
  {
    icon: ChevronDown,
    item: {label: 'Primary alpha4'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    navPosition: {desktop: POSITION.horizontal},
    nav: [
      {
        icon: ChevronDown,
        item: {label: 'Secondary menu1'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
      {
        icon: Icon,
        item: {label: 'Secondary menu2'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
    ],
  },
];

const USER_NAV = [
  {
    icon: UserIcon,
    item: {label: 'Account item1'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: UserIcon,
    item: {label: 'Account item2'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: UserIcon,
    item: {label: 'Account item3'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: UserIcon,
    item: {label: 'Account item4'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
];

function isActive(
  arr: Array<any>,
  item: any,
  activeItem: any,
): boolean {
  let active = false;
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      if (item === activeItem) return true;
      return isActive(
        (item && item.nav) || [],
        activeItem,
        activeItem,
      );
    } else if (elm.nav) {
      active = isActive(elm.nav || [], item, activeItem);
    }
  }
  return active;
}

export default () => {
  const [css] = useStyletron();
  const [isNavBarVisible, setIsNavBarVisible] = React.useState(
    false,
  );
  const [activeNavItem, setActiveNavItem] = React.useState();
  const containerStyles = css({
    boxSizing: 'border-box',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
  });
  const appDisplayName = (
    <StyledLink
      $style={{
        textDecoration: 'none',
        color: 'inherit',
        ':hover': {color: 'inherit'},
        ':visited': {color: 'inherit'},
      }}
      href={'#'}
    >
      App Something
    </StyledLink>
  );
  return (
    <React.Fragment>
      <Button onClick={() => setIsNavBarVisible(!isNavBarVisible)}>
        {isNavBarVisible ? 'Hide' : 'Show'} navigation bar
      </Button>
      {isNavBarVisible ? (
        <Layer>
          <div className={containerStyles}>
            <AppNavBar
              appDisplayName={appDisplayName}
              mainNav={MAIN_NAV}
              isNavItemActive={({item}) => {
                return (
                  item === activeNavItem ||
                  isActive(MAIN_NAV, item, activeNavItem)
                );
              }}
              onNavItemSelect={({item}) => {
                if (item === activeNavItem) return;
                setActiveNavItem(item);
              }}
              userNav={USER_NAV}
              username="Umka Marshmallow"
              usernameSubtitle="5.0"
              userImgUrl=""
            />
          </div>
        </Layer>
      ) : null}
    </React.Fragment>
  );
};
