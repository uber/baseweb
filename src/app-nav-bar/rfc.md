# baseui/navigation-bar

A customizable and composable top navigation bar component.

## Motivation

The goal is to standartize and create a shared navigation experience across the applications and products.
It will enable users to orient and navigate different sections of applications reliably.

## Components and API

Application navigation bar component is one of the more complex composable components and internally it will reuse some of the Base Web components like Grid, Drawer, Avatar.
It will also export some styled elements that are not pre-composed but supposed to be used for smaller elements like application's logo/title in order to get those styled accordinly to the Base DL.

### AppNavBar

Will render application logo, contain main navigation menu as well as profile menu.
AppNavBar will be responsible for rendering hamburger menu when menu items don't fit on the screen size. On smaller screens clicking the hamburger menu triggers a drawer component to be rendered that will contain the menu components.

`children`: `React.Children`

`title`: `React.Node` - Application title, logo, or both.

<!-- `menu`: `React.Element<typeof MenuList>` - Main navigation. Composable and rendered `MenuList` component. -->

<!-- `profileMenu`: `React.Element<typeof ProfileMenu>` - User profile navigation. Composable and rendered `ProfileMenu` component. Make sure that user is authenticated before rendering this part of the navigation. -->

`mainNav`: `Array<MainNavItemT>` - A list of main navigation menu items.

`MainNavItemT`: `{`active`:`boolean`, - Indicates if the menu item is currently active.`title`:`React.Node`,`url`:`string`,`sideNavTitle`:`?React.Node`,`sideNavLevel`:`'primary' | 'secondary' | 'none'`,`nav`:`Array<MainNavItemT>`, - List of sub navigation items.`subnavPosition`:`'horizontal' | 'vertical'`, - Vertical sub menu should be rendered as a side navigation therefore will probably not be a part of the AppBar component.`backToNavTitle`:`?React.Node`, - Title rendered next to the back or close button when a main nav item's sub-item is selected on a small screen. }`

`profileNav`: `Array<ProfileNavItemT>` - A list of user profile menu items.

`ProfileNavItemT`: `{`active`:`boolean`, - Indicated if the menu item is currently active.`title`:`React.Node`,`url`:`string`,`sideNavTitle`:`?React.Node`,`nav`:`Array<MainNavItemT>`, - List of sub navigation items.`backToNavTitle`:`?React.Node`, - Title rendered next to the back or close button when a main nav item's sub-item is selected on a small screen. }`

### NavigationMenuList

Container for a main navigation. On smaller screens rendered inside a drawer component.

`mainNav`: `Array<MainNavItemT>` - A list of main navigation menu items.

`children`: `React.Children`

### NavigationMenuItem

Menu item can be a simple Styled link element pointing to a new application section or a navigation group element that when clicked will show subnavigation items.

`...MainNavItemT`

### ProfileMenu

A dropdown profile menu component. On smaller screens renders inside a drawer component.

`anchorEl`: `React.Node` - The element used as an anchor for the profile dropdown menu.

`sideNavTitle`: `?React.Node` - Used as a menu item inside the hamburger menu on smaller screens.

`dropdownHeader`: `React.Node` - The header of the profile dropdowm menu.

`profileNav`: `Array<ProfileNavItemT>` - A list of user profile menu items.

### ProfileMenuItem

Menu item can be a simple Styled link element pointing to a new application section or a navigation group element that when clicked will show subnavigation items.

`...ProfileNavItemT`
