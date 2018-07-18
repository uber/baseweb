// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {styled, withStyle} from 'styletron-react';
import {
  StatefulCheckbox as Checkbox,
  StyledRoot,
  StyledLabel,
  StyledCheckmark,
  StyledInput,
  Checkbox as StatelessCheckbox,
} from './index';

const onChange = e => {
  // eslint-disable-next-line no-console
  console.log('Checked:', e.target.checked);
};

const Icon = styled('span', () => {
  return {
    display: 'flex',
    alignItems: 'center',
    ':before': {
      content: '"Click to focus on checkbox"',
      display: 'inline-block',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      borderRadius: '2px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'black',
      backgroundColor: 'lightblue',
    },
  };
});

class GroupList extends React.Component<{}, {checkboxes: Array<boolean>}> {
  static defaultProps: {} = {};
  constructor(props: {}) {
    super(props);
    this.state = {
      checkboxes: [false, false],
    };
  }
  render() {
    const {checkboxes} = this.state;
    const unchecked = checkboxes.filter(checkbox => !checkbox).length;
    const isIndeterminate = unchecked > 0 && unchecked < checkboxes.length;
    return (
      <div>
        <StatelessCheckbox
          components={{
            Root: StyledRoot,
            Label: StyledLabel,
            Checkmark: StyledCheckmark,
            Input: StyledInput,
          }}
          onChange={e => {
            const checkboxes = [e.target.checked, e.target.checked];
            this.setState({checkboxes});
          }}
          isIndeterminate={isIndeterminate}
          checked={unchecked === 0}
          label="Indeterminate checkbox if not all subcheckboxes are checked"
        />
        <div style={{padding: 30}}>
          <div>
            <StatelessCheckbox
              components={{
                Root: StyledRoot,
                Label: StyledLabel,
                Checkmark: StyledCheckmark,
                Input: StyledInput,
              }}
              checked={checkboxes[0]}
              onChange={e => {
                const newCheckboxes = checkboxes.slice();
                newCheckboxes[0] = e.target.checked;
                this.setState({checkboxes: newCheckboxes});
              }}
              label="First subcheckbox"
            />
          </div>
          <StatelessCheckbox
            components={{
              Root: StyledRoot,
              Label: StyledLabel,
              Checkmark: StyledCheckmark,
              Input: StyledInput,
            }}
            checked={checkboxes[1]}
            onChange={e => {
              const newCheckboxes = checkboxes.slice();
              newCheckboxes[1] = e.target.checked;
              this.setState({checkboxes: newCheckboxes});
            }}
            label="Second subcheckbox"
          />
        </div>
      </div>
    );
  }
}

storiesOf('Checkbox', module)
  .add('Checkbox example', () => {
    return <Checkbox onChange={onChange} label="click me" />;
  })
  .add('Checkbox with an error', () => {
    return (
      <Checkbox
        onChange={onChange}
        isError={true}
        label="Checkbox with an isError "
      />
    );
  })
  .add('Checkbox Indeterminate', () => {
    return <GroupList />;
  })
  .add('Checkbox disabled', () => {
    return <Checkbox onChange={onChange} disabled label="Disabled checkbox" />;
  })
  .add('Checkbox label placed left', () => {
    return (
      <Checkbox
        onChange={onChange}
        labelPlacement="left"
        label="Label on the left"
      />
    );
  })
  .add('Checkbox label placed bottom', () => {
    return (
      <Checkbox
        onChange={onChange}
        labelPlacement="bottom"
        label="Label on the bottom"
      />
    );
  })
  .add('Checkbox with style overrides', () => {
    return (
      <Checkbox
        onChange={onChange}
        components={{
          Root: withStyle(StyledRoot, () => {
            return {
              border: `1px solid green`,
              padding: '10px',
            };
          }),
          Label: withStyle(StyledLabel, () => {
            return {
              color: 'orange',
              fontSize: '25px',
            };
          }),
          Checkmark: withStyle(StyledCheckmark, props => {
            const {checked} = props;
            return checked
              ? {borderColor: 'pink'}
              : {
                  borderColor: 'pink',
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="-1" x2="11" y2="-1" transform="translate(0 2)" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>\');',
                  backgroundColor: 'black',
                };
          }),
        }}
        label="With style overrides"
      />
    );
  })
  .add('Checkbox with override components', () => {
    const customLabel = () => {
      const crab =
        'data:image/svg+xml;charset=US-ASCII, <svg xmlns="http://www.w3.org/2000/svg" viewBox="1.5 113.9 256 256"><path fill="#9E2610" d="M72.1 296.8s-31.8 11.7-37.9 20.5c0 0 3.5-21.3 30.9-32.7l7 12.2zM84.2 307.5s-21.9 22.8-23.4 32.7c0 0-5.8-19.3 12.5-40.1l10.9 7.4zM68.3 278.8s-34 2.4-43.3 9.1c0 0 12.3-19.5 42.3-22.8l1 13.7zM185.4 295s31.8 11.7 37.9 20.5c0 0-3.5-21.3-30.9-32.7l-7 12.2z"/><path fill="#D62D0E" d="M50.5 223.5S13 205.5 41 161c0 0 9-19.5 38-16.5L53.5 205l46-32.8s12.5 24.5-11 42.2c0 0-13.8 10.2-20.8 9 0 0 4.5 11 12 16.2l3.5 3.2-9.5 11c.1.2-20.7-15.3-23.2-30.3z"/><path fill="#9E2610" d="M173.3 305.6s21.9 22.8 23.4 32.7c0 0 5.8-19.3-12.5-40.1l-10.9 7.4zM189.2 276.9s34 2.4 43.3 9.1c0 0-12.3-19.5-42.3-22.8l-1 13.7z"/><path fill="#D62D0E" d="M207.9 223.5s37.5-18 9.5-62.5c0 0-9-19.5-38-16.5l25.5 60.5-46-32.8s-12.5 24.5 11 42.2c0 0 13.8 10.2 20.8 9 0 0-4.5 11-12 16.2l-3.5 3.2 9.5 11c0 .2 20.7-15.3 23.2-30.3z"/><path fill="#D62D0E" d="M127.8 212s44-5.2 65.2 57.8c0 0 11.8 44.5-62.2 48.5 0 0-70.2 1.2-66.2-43.8-.1 0 6.6-54 63.2-62.5z"/><circle fill="#FFF" cx="103.8" cy="265.1" r="23.5"/><circle fill="#FFF" cx="153.6" cy="264.1" r="23.5"/><circle cx="105.2" cy="263.8" r="14.8"/><circle cx="152.2" cy="262.5" r="14.8"/><ellipse transform="rotate(-45.37 157.15 256.57)" fill="#FFF" cx="157.1" cy="256.6" rx="4.7" ry="7.2"/><ellipse transform="rotate(-45.37 110.35 257.456)" fill="#FFF" cx="110.3" cy="257.4" rx="4.7" ry="7.2"/><path d="M78.5 290s12.7 20 51.6 19.5c0 0 34.2 1.5 49.2-19.5 0 0-15.8 17.5-49.2 17.2 0 0-36.1.3-51.6-17.2z"/></svg>';
      return (
        <span>
          This is a totally different <b>checkbox</b>. Click on sandwatch
          <img style={{width: 40}} src={crab} alt="crab" />
        </span>
      );
    };
    const customCheckmark = (props: {checked: boolean}) => {
      const {checked} = props;
      const color = checked ? 'red' : 'blue';
      const blackSandwatch = `data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000"  xml:space="preserve"><g fill="${color}"><path d="M293.7,886.8h-51.6V726.9c2.6-12.9,30.9-116.1,90.3-147c33.5-15.5,54.2-64.5,61.9-85.1v-18.1c-7.7-20.6-30.9-69.6-61.9-85.1c-59.3-30.9-87.7-134.1-90.3-147v-5.2V110.6h51.6v126.4c10.3,36.1,33.5,95.4,61.9,108.3c59.3,30.9,90.3,113.5,90.3,118.6l2.6,5.2v33.5l-2.6,5.2c0,2.6-30.9,87.7-90.3,118.6c-30.9,15.5-56.7,82.5-61.9,108.3V886.8z"/><path d="M757.9,886.8h-51.6V734.7c-10.3-36.1-33.5-95.4-61.9-108.3c-59.3-30.9-90.3-113.5-90.3-118.6l-2.6-2.6v-33.5l2.6-5.2c0-2.6,30.9-87.7,90.3-118.6c30.9-15.5,56.7-82.5,61.9-108.3V113.2h51.6v134.1c-2.6,12.9-30.9,116.1-90.3,147c-33.5,15.5-54.2,64.5-61.9,85.1v18.1c7.7,20.6,30.9,69.6,61.9,85.1c59.3,30.9,87.7,134.1,90.3,147v5.2V886.8z"/><path d="M371.1,267.9c0,0,51.6,128.9,128.9,128.9c77.4,0,128.9-128.9,128.9-128.9s-51.6,25.8-128.9,25.8C422.6,293.7,371.1,267.9,371.1,267.9z"/><path d="M809.5,61.6H190.5V10h618.9V61.6z"/><path d="M809.5,990H190.5v-51.6h618.9V990z"/><path d="M345.3,886.8c0,0,51.6-154.7,154.7-154.7c103.2,0,154.7,154.7,154.7,154.7H345.3z"/></g></svg>`;
      return <img style={{width: 40}} src={blackSandwatch} alt="sandbox" />;
    };
    return (
      <Checkbox
        onChange={onChange}
        components={{
          Label: customLabel,
          Checkmark: customCheckmark,
        }}
        label="With style overrides"
      />
    );
  })
  .add('Checkbox with extra props', () => {
    function withProps(Component: React.ComponentType<*>, customProps: {}) {
      const comp = (props: {}) => <Component {...customProps} {...props} />;
      return comp;
    }
    const RootWithProps = withProps(StyledRoot, {'data-value': 'secret value'});
    return (
      <Checkbox
        onChange={onChange}
        components={{
          Root: RootWithProps,
        }}
        label="With a custom 'data-value' attr on the Root"
      />
    );
  })
  .add('Checkbox with a ref to focus on', () => {
    const inputRef = React.createRef();
    let isFocused = true;
    return (
      <div>
        <Icon
          $position="right"
          onClick={() => {
            if (inputRef.current) {
              isFocused = !isFocused;
              if (isFocused) {
                inputRef.current.focus();
              } else {
                inputRef.current.blur();
              }
            }
          }}
        />
        <Checkbox
          label="Focused checkbox"
          onChange={onChange}
          inputRef={inputRef}
          autoFocus={isFocused}
        />
      </div>
    );
  });
