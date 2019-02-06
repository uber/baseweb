/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//@flow
import * as React from 'react';
import {styled} from 'baseui/styles';
import {default as SearchIcon} from 'baseui/icon/search';
import {trackEvent} from '../helpers/ga';

const SEARCH_INPUT_ID = 'algolia-doc-search';

type State = {
  enabled: boolean,
};

// can't really use baseui/input because algolia injects its
// own markdown and breaks our component (that's fairly complex)
const PlainInput = styled('input', ({$theme}) => ({
  borderWidth: '1px',
  borderRadius: '4px',
  borderColor: $theme.colors.mono200,
  borderStyle: 'solid',
  paddingLeft: '42px',
  color: $theme.colors.mono800,
  paddingRight: '12px',
  paddingTop: '9px',
  paddingBottom: '9px',
  fontSize: '14px',
  width: '250px',
  backgroundColor: $theme.colors.mono200,
  lineHeight: '20px',
  outline: 'none',
  '-webkit-appearance': 'none',
  ':focus': {
    backgroundColor: $theme.colors.mono100,
    borderColor: $theme.colors.primary,
  },
}));

const IconWrapper = styled('div', {
  marginRight: '-33px',
  marginTop: '10px',
  zIndex: 1,
});

class DocSearch extends React.Component<{}, State> {
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
    return enabled ? (
      <React.Fragment>
        <style>{`.ds-dropdown-menu { margin-top: 12px !important }`}</style>
        <IconWrapper>
          <SearchIcon size={22} color="#666" />
        </IconWrapper>
        <PlainInput
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
