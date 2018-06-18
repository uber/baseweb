// @flow
import * as React from 'react';
import {BaseInput} from './index';

function getAdjoinedProp({startEnhancer, endEnhancer}) {
  if (startEnhancer && endEnhancer) {
    return 'both';
  } else if (startEnhancer) {
    return 'left';
  } else if (endEnhancer) {
    return 'right';
  }
  return 'none';
}

class TextInput extends React.Component {
  static defaultProps = {
    label: null,
    caption: null,
    startEnhancer: null,
    endEnhancer: null,
    disabled: false,
    $error: false,
    $size: 'default',
  };

  getSharedProps(props) {
    const sharedProps = {};
    for (let key in props) {
      if (key[0] === '$') {
        sharedProps[key] = props[key];
      }
    }
    sharedProps.$disabled = this.props.disabled;
    return sharedProps;
  }

  render() {
    const {label, caption, startEnhancer, endEnhancer, ...rest} = this.props;

    const {
      Root,
      Label,
      Caption,
      StartEnhancer,
      EndEnhancer,
    } = this.props.components;

    const sharedProps = this.getSharedProps(rest);
    return (
      <React.Fragment>
        {label ? <Label {...sharedProps} children={label} /> : null}
        <Root {...sharedProps}>
          {startEnhancer ? (
            <StartEnhancer
              {...sharedProps}
              $position="start"
              children={startEnhancer}
            />
          ) : null}
          <BaseInput
            {...rest}
            $adjoined={getAdjoinedProp({startEnhancer, endEnhancer})}
          />
          {endEnhancer ? (
            <EndEnhancer
              {...sharedProps}
              $position="end"
              children={endEnhancer}
            />
          ) : null}
        </Root>
        {caption ? <Caption {...sharedProps} children={caption} /> : null}
      </React.Fragment>
    );
  }
}

export default TextInput;
