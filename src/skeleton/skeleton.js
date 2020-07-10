
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import type {SkeletonPropsT} from './types.js';
import {
  StyledRoot,
  StyledRow,
} from './styled-components.js';


class Skeleton extends React.Component<SkeletonPropsT> {
  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Row, rowProps] = getOverrides(overrides.Row, StyledRow);

    if (typeof this.props.rows === 'number') {
      return (
        <Root {...rootProps}>
          {Array(this.props.rows).fill().map(() => (
            <Row {...rowProps}></Row>
          ))
          }
        </Root>
      );
    }
    return <Root {...rootProps} />;
  }


}

export default Skeleton;