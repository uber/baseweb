/* eslint-disable flowtype/require-valid-file-annotation, react/prop-types*/
import * as React from 'react';
// Files
import {STATE_CHANGE_TYPE} from './constants';

export default class PaginationStatefulContainer extends React.Component {
  static defaultProps = {
    initialState: {
      currentPage: 1,
    },
    stateReducer: (changeType, changes) => changes,
  };

  state = {...this.props.initialState};

  // Internal set state function that will also invoke stateReducer
  internalSetState(changeType, changes) {
    const {stateReducer} = this.props;
    this.setState(stateReducer(changeType, changes, this.state));
  }

  // Clamp page to min and max
  clampPage = page => {
    const {numPages} = this.props;
    return Math.min(Math.max(page, 0), numPages);
  };

  changePage = newPage => {
    const {numPages} = this.props;
    const clamped = Math.min(nextPage, this.prop);
  };

  render() {
    const {highlightedIndex} = this.state;
    const {children, items, getItemLabel} = this.props;
    // $FlowFixMe
    return children(
      ({
        initialPage,
        items,
        getItemLabel,
        rootRef: this.rootRef,
        getRequiredItemProps: this.getRequiredItemProps,
      }: RenderPropsT),
    );
  }
}
