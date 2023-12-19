/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//
import * as React from "react";
import SearchIcon from "baseui/icon/search";
import { themedStyled } from "../pages/_app";
import { trackEvent } from "../helpers/ga";

const SEARCH_INPUT_ID = "algolia-doc-search";

// can't really use baseui/input because algolia injects its
// own markdown and breaks our component (that's fairly complex)
const PlainInput = themedStyled("input", ({ $theme }) => ({
  display: "block",
  borderLeftWidth: "2px",
  borderRightWidth: "2px",
  borderTopWidth: "2px",
  borderBottomWidth: "2px",
  borderLeftColor: $theme.colors.inputEnhancerFill,
  borderRightColor: $theme.colors.inputEnhancerFill,
  borderTopColor: $theme.colors.inputEnhancerFill,
  borderBottomColor: $theme.colors.inputEnhancerFill,
  borderLeftStyle: "solid",
  borderRightStyle: "solid",
  borderTopStyle: "solid",
  borderBottomStyle: "solid",
  paddingLeft: $theme.direction === "rtl" ? "9px" : "36px",
  paddingRight: $theme.direction === "rtl" ? "36px" : "9px",
  backgroundColor: "transparent",
  paddingTop: "9px",
  paddingBottom: "9px",
  fontSize: "14px",
  width: "100%",
  minWidth: "225px",
  color: $theme.colors.contentPrimary,
  lineHeight: "20px",
  outline: "none",
  "-webkit-appearance": "none",
  ":focus": {
    borderLeftColor: $theme.colors.primary,
    borderRightColor: $theme.colors.primary,
    borderTopColor: $theme.colors.primary,
    borderBottomColor: $theme.colors.primary,
  },
}));

const SearchContainer = themedStyled(
  "div",
  ({ $theme }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: $theme.colors.inputEnhancerFill,
    position: "relative",
  })
);

const IconWrapper = themedStyled("div", ({ $theme }) => ({
  position: "absolute",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
}));

class DocSearch extends React.Component {
  state = {
    enabled: true,
  };
  componentDidMount() {
    // eslint-disable-next-line
    const { docsearch } = window;
    if (docsearch) {
      docsearch({
        apiKey: "05dde354af2e84a6d80e426518498d71",
        indexName: "baseui",
        inputSelector: `#${SEARCH_INPUT_ID}`,
        debug: true,
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        "Search has failed to load and now is being disabled"
      );
      this.setState({ enabled: false });
    }
  }

  render() {
    return this.state.enabled ? (
      <React.Fragment>
        <style>{`
          .algolia-autocomplete {
            width: 100%;
          }
          .ds-dropdown-menu {
            margin-top: 12px !important;
            width: calc(100vw - 50px) !important;
            min-width: unset !important;
          }
        `}</style>
        <SearchContainer>
          <IconWrapper>
            <SearchIcon size={24} color="contentPrimary" />
          </IconWrapper>
          <PlainInput
            id={SEARCH_INPUT_ID}
            type="search"
            placeholder="Search documentation"
            aria-label="Search documentation"
            onChange={(e) =>
              trackEvent("algolia_search", e.target.value)
            }
          />
        </SearchContainer>
      </React.Fragment>
    ) : null;
  }
}

export default DocSearch;
