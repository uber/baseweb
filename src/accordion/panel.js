/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {LocaleContext} from '../locale/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import PlusIcon from '../icon/plus.js';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';
import {
  PanelContainer as StyledPanelContainer,
  Header as StyledHeader,
  Content as StyledContent,
  ToggleIcon as StyledToggleIcon,
  ContentAnimationContainer as StyledContentAnimationContainer,
} from './styled-components.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

import type {PanelPropsT} from './types.js';

const Panel = ({
  'aria-controls': ariaControls,
  children,
  disabled = false,
  expanded = false,
  onChange = () => {},
  onClick = () => {},
  onKeyDown = () => {},
  overrides = {},
  title = '',
  renderPanelContent = () => {},
  renderAll = () => {},
}: PanelPropsT) => {
  const [localState, setLocalState] = React.useState({
    expanded,
    isFocusVisible: false,
    elementHeight: 0,
    animationInProgress: false,
  });
  const handleFocus = React.useCallback((event: SyntheticEvent<>) => {
    if (isFocusVisible(event)) {
      setLocalState({...localState, isFocusVisible: true});
    }
  });
  const handleBlur = React.useCallback((event: SyntheticEvent<>) => {
    if (localState.isFocusVisible !== false) {
      setLocalState({...localState, isFocusVisible: false});
    }
  });
  const _onClick = React.useCallback((e: Event) => {
    if (disabled) {
      return;
    }
    typeof onChange === 'function' && onChange({expanded: !expanded});
    typeof onClick === 'function' && onClick(e);
  });
  const _onKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (disabled) {
      return;
    }

    const ENTER = 13;
    const SPACE = 32;

    if (e.keyCode === ENTER || e.keyCode === SPACE) {
      typeof onChange === 'function' && onChange({expanded: !expanded});
      if (e.keyCode === SPACE) {
        e.preventDefault(); // prevent jumping scroll when using Space
      }
    }
    typeof onKeyDown === 'function' && onKeyDown(e);
  });
  // eslint-disable-next-line flowtype/no-weak-types
  const _animateRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (_animateRef.current) {
      const height = _animateRef.current.getBoundingClientRect().height;
      // After the first render, and everything is in the DOM, we update the local
      //state to indicate an animation is in progress.
      if (expanded !== localState.expanded) {
        setLocalState({
          ...localState,
          expanded,
          animationInProgress: true,
        });
      } else if (parseInt(localState.elementHeight) !== height) {
        // After the second render (where child elements were added to the Content)
        //the Content height now reflects the true height. This kicks off the actual
        //animation.
        setLocalState({
          ...localState,
          elementHeight: height ? `${height}px` : 0,
        });
      }
    }
  }, [
    _animateRef.current,
    expanded,
    localState.elementHeight,
    localState.expanded,
    setLocalState,
  ]);

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
  }, [
    expanded,
    localState.expanded,
    localState.animationInProgress,
    localState.elementHeight,
  ]);

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
  } = overrides;

  const [PanelContainer, panelContainerProps] = getOverrides(
    PanelContainerOverride,
    StyledPanelContainer,
  );
  const [Header, headerProps] = getOverrides(HeaderOverride, StyledHeader);
  const [Content, contentProps] = getOverrides(ContentOverride, StyledContent);
  const [ContentAnimationContainer, contentAnimationProps] = getOverrides(
    ContentAnimationContainerOverride,
    StyledContentAnimationContainer,
  );

  const toggleIconOverrides = mergeOverrides(
    {Svg: {component: StyledToggleIcon}},
    // $FlowFixMe
    {Svg: ToggleIconOverride},
  );

  return (
    <LocaleContext.Consumer>
      {locale => (
        <PanelContainer {...sharedProps} {...panelContainerProps}>
          <Header
            tabIndex={0}
            role="button"
            aria-expanded={expanded}
            aria-disabled={disabled || null}
            {...sharedProps}
            {...headerProps}
            {...(ariaControls ? {'aria-controls': ariaControls} : {})}
            onClick={_onClick}
            onKeyDown={_onKeyDown}
            onFocus={forkFocus(headerProps, handleFocus)}
            onBlur={forkBlur(headerProps, handleBlur)}
          >
            {title}
            {expanded ? (
              <CheckIndeterminateIcon
                size={16}
                title={locale.accordion.collapse}
                {...sharedProps}
                overrides={toggleIconOverrides}
              />
            ) : (
              <PlusIcon
                size={16}
                title={locale.accordion.expand}
                {...sharedProps}
                overrides={toggleIconOverrides}
              />
            )}
          </Header>
          <ContentAnimationContainer
            {...sharedProps}
            {...contentAnimationProps}
            data-testid="transitionDiv"
            $height={contentHeight}
            onTransitionEnd={() => {
              if (localState.animationInProgress) {
                setLocalState({...localState, animationInProgress: false});
              }
            }}
          >
            <Content
              ref={_animateRef}
              {...sharedProps}
              {...contentProps}
              {...(ariaControls ? {id: ariaControls} : {})}
            >
              {localState.expanded ||
              renderAll ||
              renderPanelContent ||
              localState.animationInProgress
                ? children
                : null}
            </Content>
          </ContentAnimationContainer>
        </PanelContainer>
      )}
    </LocaleContext.Consumer>
  );
};

export default Panel;
