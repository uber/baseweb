import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {Layer} from 'baseui/layer';
import {
  ChevronDown,
  Delete,
  Overflow as UserIcon,
  Upload as Icon,
} from 'baseui/icon';
import {Unstable_AppNavBar as AppNavBar} from 'baseui/app-nav-bar';

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

function findAndSetActiveChain(item, arr): [boolean, Array<any>] {
  let returnValue = [false, arr];
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      const newArr = [...arr];
      newArr[i] = {...elm, active: true};
      returnValue = [true, newArr];
      break;
    } else if (elm.nav) {
      const [foundItem, updatedSubnav] = findAndSetActiveChain(
        item,
        elm.nav,
      );
      if (foundItem) {
        const newArr = [...arr];
        newArr[i] = {...elm, active: true, nav: updatedSubnav};
        returnValue = [true, newArr];
        break;
      }
    }
  }
  return returnValue;
}

export default () => {
  const [css] = useStyletron();
  const [isNavBarVisible, setIsNavBarVisible] = React.useState(
    false,
  );
  const [nav, setNav] = React.useState(MAIN_NAV);
  const containerStyles = css({
    boxSizing: 'border-box',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
  });
  return (
    <React.Fragment>
      <Button onClick={() => setIsNavBarVisible(!isNavBarVisible)}>
        {isNavBarVisible ? 'Hide' : 'Show'} navigation bar
      </Button>
      {isNavBarVisible ? (
        <Layer>
          <div className={containerStyles}>
            <AppNavBar
              appDisplayName="App Something"
              mainNav={nav}
              onNavItemSelect={({item}) => {
                console.log(item);
                if (item.active) return;
                const [_, nextNav] = findAndSetActiveChain(
                  item,
                  MAIN_NAV,
                );
                setNav(nextNav);
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
