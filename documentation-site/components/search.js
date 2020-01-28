/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//@flow
import * as React from 'react';
import {default as SearchIcon} from 'baseui/icon/search';
import {themedStyled} from '../pages/_app';
//$FlowFixMe
import {trackEvent} from '../helpers/ga';

const SEARCH_INPUT_ID = 'algolia-doc-search';

type Props = {
  toggleSearchInput: () => void,
  searchInputOpen: boolean,
};
type State = {
  enabled: boolean,
};

// can't really use baseui/input because algolia injects its
// own markdown and breaks our component (that's fairly complex)
const PlainInput = themedStyled<{$inputVisible: boolean}>(
  'input',
  ({$inputVisible, $theme}) =>
    ({
      display: $inputVisible ? 'block' : 'none',
      borderWidth: '2px',
      borderColor: $theme.colors.inputEnhancerFill,
      borderStyle: 'solid',
      paddingLeft: $theme.direction === 'rtl' ? '9px' : '42px',
      paddingRight: $theme.direction === 'rtl' ? '42px' : '9px',
      backgroundColor: 'transparent',
      paddingTop: '9px',
      paddingBottom: '9px',
      fontSize: '14px',
      width: $inputVisible ? '62vw' : '250px',
      lineHeight: '20px',
      outline: 'none',
      '-webkit-appearance': 'none',
      ':focus': {
        borderColor: $theme.colors.primary,
      },
      [$theme.mediaQuery.small]: {
        position: 'static',
        display: 'block',
        width: '250px',
      },
    }: {}),
);

const SearchContainer = themedStyled<{}>(
  'div',
  ({$theme}) =>
    ({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: $theme.colors.inputEnhancerFill,
      position: 'relative',
    }: {}),
);

const IconWrapper = themedStyled<{$inputVisible: boolean}>(
  'div',
  ({$inputVisible, $theme}) => ({
    position: 'absolute',
    [$theme.direction === 'rtl' ? 'right' : 'left']: $inputVisible
      ? '12px'
      : '-33px',
    marginTop: $inputVisible ? '4px' : 0,
    height: '32px',
    cursor: 'pointer',
    [$theme.mediaQuery.small]: {
      [$theme.direction === 'rtl' ? 'right' : 'left']: '12px',
      marginTop: '4px',
      cursor: 'inherit',
    },
  }),
);

class DocSearch extends React.Component<Props, State> {
  state = {
    enabled: true,
  };
  componentDidMount() {
    // eslint-disable-next-line
    const {docsearch} = window;
    if (docsearch) {
      docsearch({
        apiKey: '05dde354af2e84a6d80e426518498d71',
        indexName: 'baseui',
        inputSelector: `#${SEARCH_INPUT_ID}`,
        debug: true,
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn('Search has failed to load and now is being disabled');
      this.setState({enabled: false});
    }
  }

  render() {
    const {enabled} = this.state;
    const {searchInputOpen, toggleSearchInput} = this.props;

    return enabled ? (
      <React.Fragment>
        <style>{`.ds-dropdown-menu { margin-top: 12px !important }`}</style>
        <SearchContainer>
          <IconWrapper
            $inputVisible={searchInputOpen}
            role="button"
            onClick={toggleSearchInput}
          >
            <SearchIcon
              overrides={{
                Svg: {
                  style: ({$theme}) => ({
                    height: searchInputOpen ? '22px' : '32px',
                    width: searchInputOpen ? '22px' : '32px',
                    fill: searchInputOpen ? '#666' : '#333',
                    [$theme.mediaQuery.small]: {
                      height: '22px',
                      width: '22px',
                      fill: '#666',
                    },
                  }),
                },
              }}
              color={searchInputOpen ? '#333' : '#666'}
            />
          </IconWrapper>
          <PlainInput
            $inputVisible={searchInputOpen}
            id={SEARCH_INPUT_ID}
            type="search"
            placeholder="Search documentation"
            aria-label="Search documentation"
            onChange={e => trackEvent('algolia_search', e.target.value)}
          />
        </SearchContainer>
      </React.Fragment>
    ) : null;
  }
}

export default DocSearch;
