/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import React, { createContext, isValidElement, useContext, useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useUID } from 'react-uid';
import type { StyleObject } from 'styletron-react';
import { getOverrides } from '../helpers/overrides';
import type { Override } from '../helpers/overrides';
import ChevronDown from '../icon/chevron-down';
import ChevronUp from '../icon/chevron-up';
import { styled, useStyletron } from '../styles/index';

type SideNavigationContextValue = {
  activeItemId: string | null;
};

const SideNavigationContext = createContext<SideNavigationContextValue>({
  activeItemId: null,
});

type StyledListProps = {
  $open?: boolean;
};

const StyledList = styled<'ul', StyledListProps>('ul', ({ $open = true }) => ({
  display: $open ? 'block' : 'none',
  margin: 0,
  padding: 0,
}));

const StyledListItem = styled('li', {
  listStyleType: 'none',
});

type SideNavigationProps = {
  activeItemId: string | null;
  children: ReactNode | undefined | null;
  overrides?: {
    List?: Override;
  };
};

export function SideNavigation(props: SideNavigationProps) {
  const { activeItemId = null, children, overrides = {} } = props;
  const [List, listProps] = getOverrides(overrides.List, StyledList);
  return (
    <SideNavigationContext.Provider value={{ activeItemId }}>
      <List {...listProps}>{children}</List>
    </SideNavigationContext.Provider>
  );
}

const StyledStartWrapper = styled('div', () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const StyledEndWrapper = styled('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: $theme.sizing.scale900,
}));

const StyledStartEnhancerWrapper = styled('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: $theme.sizing.scale950,
}));

type StyledActionProps = {
  $active: boolean;
  $clickable: boolean;
  $disabled: boolean;
  $indent: number;
};

const StyledAction = styled<'a', StyledActionProps>('a', (props) => {
  const { $active, $clickable, $disabled, $indent, $theme } = props;
  const { colors, sizing, typography } = $theme;

  const paddingLeft =
    parseInt(sizing.scale600) + parseInt(sizing.scale950) * Math.max($indent, 0) + 'px';

  let style: StyleObject = {
    alignItems: 'center',
    background: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderLeft: $active
      ? `solid ${sizing.scale100} ${colors.contentPrimary}`
      : `solid ${sizing.scale100} transparent`,
    boxShadow: $active ? 'inset 999px 999px 0px rgb(0 0 0 / 8%)' : 'none',
    boxSizing: 'border-box',
    color: !$clickable || $active ? colors.contentPrimary : colors.contentSecondary,
    display: 'flex',
    font: 'inherit',
    justifyContent: 'space-between',
    overflowWrap: 'anywhere',
    paddingTop: sizing.scale550,
    paddingRight: sizing.scale600,
    paddingBottom: sizing.scale550,
    paddingLeft,
    textDecoration: 'none',
    width: '100%',
    ...typography.LabelMedium,
  };

  if ($clickable) {
    style[':hover'] = {
      boxShadow: 'inset 999px 999px 0px rgb(0 0 0 / 4%)',
      cursor: 'pointer',
    };
  }

  if ($disabled) {
    style.color = colors.contentStateDisabled;
    style.cursor = 'not-allowed';
  }

  return style;
});

type ItemProps = {
  ariaControls?: string;
  ariaExpanded?: boolean;
  active?: boolean;
  disabled?: boolean;
  endEnhancer?: ReactNode;
  href?: string;
  indent?: number;
  label: string;
  onClick?: () => void;
  overrides?: {
    Action?: Override;
    EndWrapper?: Override;
    StartEnhancerWrapper?: Override;
    StartWrapper?: Override;
  };
  startEnhancer?: ReactNode;
};

function Item(props: ItemProps) {
  const {
    ariaControls,
    ariaExpanded,
    active = false,
    disabled = false,
    endEnhancer,
    href,
    indent = 0,
    label,
    onClick,
    overrides = {},
    startEnhancer,
  } = props;

  if (!label) {
    return null;
  }

  const [Action, actionProps] = getOverrides(overrides.Action, StyledAction);
  const [EndWrapper, endWrapperProps] = getOverrides(overrides.EndWrapper, StyledEndWrapper);
  const [StartEnhancerWrapper, startEnhancerWrapperProps] = getOverrides(
    overrides.StartEnhancerWrapper,
    StyledStartEnhancerWrapper
  );
  const [StartWrapper, startWrapperProps] = getOverrides(
    overrides.StartWrapper,
    StyledStartWrapper
  );
  const clickable = Boolean((onClick || href) && !disabled);
  const actionElement = clickable ? (href ? 'a' : 'button') : 'div';

  return (
    <Action
      $active={active}
      $as={actionElement}
      $clickable={clickable}
      $disabled={disabled}
      $indent={indent}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      href={href}
      onClick={onClick}
      type={actionElement === 'button' ? 'button' : undefined}
      {...actionProps}
    >
      <StartWrapper {...startWrapperProps}>
        {startEnhancer && (
          <StartEnhancerWrapper {...startEnhancerWrapperProps}>
            {startEnhancer}
          </StartEnhancerWrapper>
        )}
        {label}
      </StartWrapper>
      {endEnhancer && <EndWrapper {...endWrapperProps}>{endEnhancer}</EndWrapper>}
    </Action>
  );
}

type SideNavigationHeaderProps = {
  children: ItemProps['label'];
  endEnhancer?: ItemProps['endEnhancer'];
  startEnhancer?: ItemProps['startEnhancer'];
  overrides?: ItemProps['overrides'] & { ListItem?: Override };
};

export function SideNavigationHeader({
  children,
  overrides: { ListItem, ...overrides } = {},
  ...props
}: SideNavigationHeaderProps) {
  const [OverridedListItem, listItemProps] = getOverrides(ListItem, StyledListItem);
  return (
    <OverridedListItem {...listItemProps}>
      <Item {...props} label={children} overrides={overrides} />
    </OverridedListItem>
  );
}

type SideNavigationItemProps = {
  children: ItemProps['label'];
  disabled?: boolean;
  endEnhancer?: ItemProps['endEnhancer'];
  href?: ItemProps['href'];
  id: string;
  initiallyActive?: ItemProps['active'];
  onClick?: ItemProps['onClick'];
  overrides?: ItemProps['overrides'] & { ListItem?: Override };
  startEnhancer?: ItemProps['startEnhancer'];
};

export function SideNavigationItem({
  children,
  id,
  overrides: { ListItem, ...overrides } = {},
  ...props
}: SideNavigationItemProps) {
  const { activeItemId } = React.useContext(SideNavigationContext);
  const [OverridedListItem, listItemProps] = getOverrides(ListItem, StyledListItem);
  return (
    <OverridedListItem {...listItemProps}>
      <Item {...props} label={children} active={activeItemId === id} overrides={overrides} />
    </OverridedListItem>
  );
}

type SideNavigationSectionProps = {
  active?: boolean;
  // @ts-expect-error
  children: React.ChildrenArray<
    | ReactElement<typeof SideNavigationItem>
    | ReactElement<typeof SideNavigationSection>
    | ReactElement<typeof SideNavigationHeader>
    | null
  >;
  forceOpen?: boolean;
  indent: number;
  overrides?: ItemProps['overrides'] & { List?: Override; ListItem?: Override };
  startEnhancer?: ReactNode;
  title: string;
};

export function SideNavigationSection(props: SideNavigationSectionProps) {
  const {
    active = false,
    children,
    forceOpen = false,
    indent = 0,
    overrides: { List, ListItem, ...overrides } = {},
    startEnhancer,
    title,
  } = props;
  const [, theme] = useStyletron();
  const { activeItemId } = useContext(SideNavigationContext);
  const [open, setOpen] = useState(false);
  const uid = useUID();

  useEffect(() => {
    let childIsActive = false;
    if (activeItemId != null) {
      let stack = React.Children.toArray(children);
      while (stack.length) {
        const current = stack.pop();
        if (isValidElement(current)) {
          if (current.props.id === activeItemId) {
            childIsActive = true;
            break;
          }
          if (current.props.children) {
            stack = stack.concat(React.Children.toArray(current.props.children));
          }
        }
      }
    }

    if (childIsActive) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [activeItemId, children]);

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
    }
  }, [forceOpen]);

  if (React.Children.toArray(children).filter(React.isValidElement).length === 0) {
    return null;
  }

  const Chevron = open ? ChevronUp : ChevronDown;
  const [OverridedList, overridedListProps] = getOverrides(List, StyledList);
  const [OverridedListItem, overridedListItemProps] = getOverrides(ListItem, StyledListItem);

  return (
    <OverridedListItem {...overridedListItemProps}>
      <Item
        ariaControls={uid}
        ariaExpanded={open}
        endEnhancer={<Chevron title="" size={theme.sizing.scale800} />}
        label={title}
        indent={indent}
        onClick={() => setOpen((prev) => !prev)}
        overrides={overrides}
        startEnhancer={startEnhancer}
      />
      <OverridedList id={uid} $open={open} {...overridedListProps}>
        {React.Children.map(children, (child) =>
          child === null ? null : React.cloneElement(child, { indent: indent + 1 })
        )}
      </OverridedList>
    </OverridedListItem>
  );
}
