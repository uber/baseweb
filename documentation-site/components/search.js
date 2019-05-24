/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//@flow
import * as React from 'react';
import {styled} from 'baseui/styles';
import {default as SearchIcon} from 'baseui/icon/search';
import {trackEvent} from '../helpers/ga';
import {HEADER_BREAKPOINT} from './header-navigation';

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
const PlainInput = styled('input', ({$theme, $inputVisible}) => ({
  display: $inputVisible ? 'block' : 'none',
  borderWidth: '1px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
  borderBottomLeftRadius: '4px',
  borderColor: $theme.colors.mono200,
  borderStyle: 'solid',
  paddingLeft: '42px',
  color: $theme.colors.foreground,
  paddingRight: '12px',
  paddingTop: '9px',
  paddingBottom: '9px',
  fontSize: '14px',
  width: $inputVisible ? '62vw' : '250px',
  backgroundColor: 'transparent',
  lineHeight: '20px',
  outline: 'none',
  '-webkit-appearance': 'none',
  ':focus': {
    backgroundColor: $theme.colors.background,
    borderColor: $theme.colors.primary,
  },
  [HEADER_BREAKPOINT]: {
    position: 'static',
    display: 'block',
    width: '250px',
  },
}));

const IconWrapper = styled('div', ({$inputVisible, $theme}) => ({
  marginRight: $inputVisible ? '-33px' : 0,
  marginTop: $inputVisible ? '8px' : 0,
  height: '32px',
  cursor: 'pointer',
  zIndex: 1,
  [HEADER_BREAKPOINT]: {
    marginRight: '-33px',
    marginTop: '8px',
    cursor: 'inherit',
    zIndex: 1,
  },
}));

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
        <IconWrapper
          $inputVisible={searchInputOpen}
          role="button"
          onClick={toggleSearchInput}
        >
          <SearchIcon
            overrides={{
              Svg: {
                style: {
                  height: searchInputOpen ? '22px' : '32px',
                  width: searchInputOpen ? '22px' : '32px',
                  fill: searchInputOpen ? '#666' : '#333',
                  [HEADER_BREAKPOINT]: {
                    height: '22px',
                    width: '22px',
                    fill: '#666',
                  },
                },
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
      </React.Fragment>
    ) : null;
  }
}

export default DocSearch;
