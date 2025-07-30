/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import ChevronDownSmall from '../icon/chevron-down-small';
import { LocaleContext } from '../locale';
import { getOverrides } from '../helpers/overrides';
import {
  PanelContainer as StyledPanelContainer,
  Header as StyledHeader,
  Content as StyledContent,
  ToggleIcon as StyledToggleIcon,
  ToggleIconGroup as StyledToggleIconGroup,
  ContentAnimationContainer as StyledContentAnimationContainer,
} from './styled-components';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { PanelProps } from './types';

import type { SyntheticEvent } from 'react';

const Panel = (
  {
    'aria-controls': ariaControls,
    children,
    disabled = false,
    expanded = false,
    onChange = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    onPanelOpened = () => {},
    overrides = {},
    title = '',
    renderAll = false,
  }: PanelProps,
  // @ts-ignore
  ref
) => {
  const [localState, setLocalState] = React.useState<{
    expanded: boolean;
    elementHeight: number | string;
    isFocusVisible: boolean;
    animationInProgress: boolean;
  }>({
    expanded,
    isFocusVisible: false,
    elementHeight: 0,
    animationInProgress: false,
  });
  const handleFocus = React.useCallback(
    (event: SyntheticEvent) => {
      if (isFocusVisible(event)) {
        setLocalState({ ...localState, isFocusVisible: true });
      }
    },
    [localState]
  );
  const handleBlur = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: SyntheticEvent) => {
      if (localState.isFocusVisible) {
        setLocalState({ ...localState, isFocusVisible: false });
      }
    },
    [localState]
  );
  const handleClick = React.useCallback(
    (e: Event) => {
      if (disabled) {
        return;
      }
      typeof onChange === 'function' && onChange({ expanded: !expanded });
      typeof onClick === 'function' && onClick(e);
    },
    [expanded, disabled, onChange, onClick]
  );
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (disabled) {
        return;
      }

      const ENTER = 13;
      const SPACE = 32;

      if (e.keyCode === ENTER || e.keyCode === SPACE) {
        typeof onChange === 'function' && onChange({ expanded: !expanded });
        if (e.keyCode === SPACE) {
          e.preventDefault(); // prevent jumping scroll when using Space
        }
      }
      typeof onKeyDown === 'function' && onKeyDown(e);
    },
    [expanded, disabled, onChange, onKeyDown]
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _animateRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (_animateRef.current) {
      const height = _animateRef.current.getBoundingClientRect().height;
      // After the first render, when everything is in the DOM, update the local
      //state to indicate an animation is in progress.
      if (expanded !== localState.expanded) {
        setLocalState({
          ...localState,
          expanded,
          animationInProgress: true,
        });
      } else if (parseInt(localState.elementHeight as string) !== height) {
        // After the second render (where child elements were added to the Content)
        //the Content height now reflects the true height. This kicks off the actual
        //animation.
        setLocalState({
          ...localState,
          elementHeight: height ? `${height}px` : 0,
        });
      }
    }
  }, [_animateRef.current, expanded, localState.elementHeight, localState.expanded, setLocalState]);

  const contentHeight = React.useMemo(() => {
    // When closing, the first render will re-query the content element for the new
    //height and set the height of the animation container from auto to a px value.
    if (!expanded && localState.expanded) {
      const height = _animateRef.current.getBoundingClientRect().height;
      setLocalState({
        ...localState,
        elementHeight: height ? `${height}px` : 0,
      });
      return localState.elementHeight;
    }
    if (!localState.expanded) {
      return 0;
    }
    // When no longer animating, set the height to auto to accommodate dynamic nested components.
    return localState.animationInProgress ? localState.elementHeight : 'auto';
  }, [expanded, localState.expanded, localState.animationInProgress, localState.elementHeight]);

  const sharedProps = {
    $disabled: disabled,
    $expanded: expanded,
    $isFocusVisible: localState.isFocusVisible,
  };

  const {
    PanelContainer: PanelContainerOverride,
    Header: HeaderOverride,
    Content: ContentOverride,
    ContentAnimationContainer: ContentAnimationContainerOverride,
    ToggleIcon: ToggleIconOverride,
    ToggleIconGroup: ToggleIconGroupOverride,
  } = overrides;

  const [PanelContainer, panelContainerProps] = getOverrides(
    PanelContainerOverride,
    StyledPanelContainer
  );
  const [Header, headerProps] = getOverrides(HeaderOverride, StyledHeader);
  const [Content, contentProps] = getOverrides(ContentOverride, StyledContent);
  const [ContentAnimationContainer, contentAnimationProps] = getOverrides(
    ContentAnimationContainerOverride,
    StyledContentAnimationContainer
  );
  const [ToggleIconGroup, toggleIconGroupProps] = getOverrides(
    ToggleIconGroupOverride,
    StyledToggleIconGroup
  );

  const [ToggleIcon, toggleIconProps] = getOverrides(ToggleIconOverride, StyledToggleIcon);

  return (
    <LocaleContext.Consumer>
      {(locale) => (
        <PanelContainer {...sharedProps} {...panelContainerProps}>
          <Header
            tabIndex={0}
            role="button"
            aria-expanded={expanded}
            aria-disabled={disabled || null}
            {...sharedProps}
            {...headerProps}
            {...(ariaControls ? { 'aria-controls': ariaControls } : {})}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onFocus={forkFocus(headerProps, handleFocus)}
            onBlur={forkBlur(headerProps, handleBlur)}
            ref={ref}
          >
            {title}
            <ToggleIcon
              viewBox="0 0 24 24"
              title={localState.expanded ? locale.accordion.collapse : locale.accordion.expand}
              $size={24}
              {...toggleIconProps}
              {...sharedProps}
            >
              <ToggleIconGroup {...sharedProps} {...toggleIconGroupProps}>
                <ChevronDownSmall />
              </ToggleIconGroup>
            </ToggleIcon>
          </Header>
          <ContentAnimationContainer
            {...sharedProps}
            {...contentAnimationProps}
            $height={contentHeight}
            onTransitionEnd={() => {
              if (localState.animationInProgress) {
                typeof onPanelOpened === 'function' && onPanelOpened();
                setLocalState({ ...localState, animationInProgress: false });
              }
            }}
          >
            <Content
              ref={_animateRef}
              {...sharedProps}
              {...contentProps}
              {...(ariaControls ? { id: ariaControls } : {})}
            >
              {localState.expanded || renderAll || localState.animationInProgress ? children : null}
            </Content>
          </ContentAnimationContainer>
        </PanelContainer>
      )}
    </LocaleContext.Consumer>
  );
};

const ForwardedPanel = React.forwardRef<HTMLElement, PanelProps>(Panel);
ForwardedPanel.displayName = 'Panel';
export default ForwardedPanel;
