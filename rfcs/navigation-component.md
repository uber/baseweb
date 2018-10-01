# Navigation Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import { Navigation } from 'baseui/navigation';

export default () => {
  const navItems = [
    {
      id: '1',
      url: '/',
      text: 'Home',
    },
    {
      id: '2',
      url: '/first',
      text: 'First',
    },
  ];
  return
    <Navigation
      navItems={navItems}
      projectName="Project Name"
    />
};
```

### Advanced usage

```javascript
import * as React from 'react';
import {
  Navigation,
  StyledActiveNavLink,
  StyledHeader,
  StyledLi,
  StyledLogoLink,
  StyledNav,
  StyledNavLink,
  StyledUl,
} from 'baseui/navigation';

const CustomActiveNavLink = withStyle(StyledActiveNavLink, {
  borderBottom: '6px solid red',
});

export default () => {
  const navItems = [
    {
      id: '1',
      url: '/',
      text: 'Home',
    },
    {
      id: '2'
      url: '/first',
      text: 'First',
    },
    {
      id: '3'
      url: '/second',
      text: 'Second',
      disabled: true,
    },
  ];
  return (
    <React.Fragment>
      <Navigation
        navItems={navItems}
        projectName="Project Name"
        isWithLoge="true"
        overrides={{
          ActiveNavLink: CustomActiveNavLink,
        }}
    />
    </React.Fragment>
  );
};
```

## Exports

* `Navigation`
* `StyledActiveNavLink`
* `StyledHeader`
* `StyledLi`
* `StyledLogoLink`
* `StyledNav`
* `StyledNavLink`
* `StyledUl`

## `Navigation` API

* `navItems: Array<Object>`- Required:
  All navigatioin items. Every item object has `id: string`, `url: string` and `text: string`. Optional `disabled: boolean` for item to be disabled from navigation.
* `projectName: string` - Required:
  Project name.
* `isWithLoge: boolean` - Optional:
  With `Uber` logo at the front of project name.
