import {toaster, ToasterContainer, PLACEMENT} from 'baseui/toast';
import {Button, SIZE} from 'baseui/button';
import {Block} from 'baseui/block';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const toasterContainerProps = require('!!extract-react-types-loader!../../../../src/toast/toaster.js');
const buttonProps = require('!!extract-react-types-loader!../../../../src/button/button.js');
const blockProps = require('!!extract-react-types-loader!../../../../src/block/block.js');

const toastConfig: TConfig = {
  imports: {
    'baseui/toast': {
      named: ['toaster', 'ToasterContainer'],
    },
    'baseui/button': {
      named: ['Button', 'SIZE'],
    },
    'baseui/block': {
      named: ['Block'],
    },
  },
  scope: {
    toaster,
    ToasterContainer,
    PLACEMENT,
    Button,
    SIZE,
    Block,
  },
  theme: [
    'toastInfoBackground',
    'toastPositiveBackground',
    'toastWarningBackground',
    'toastNegativeBackground',
    'toastText',
  ],
  props: {
    placement: {
      value: 'PLACEMENT.top',
      defaultValue: 'PLACEMENT.top',
      options: PLACEMENT,
      type: PropTypes.Enum,
      description: `Defines notifications placement.`,
      imports: {
        'baseui/toast': {
          named: ['PLACEMENT'],
        },
      },
    },
    children: {
      value: `<Button onClick={()=>{
          let toastKey;
          const msg = 'Use toaster.info(), toaster.positive(), toaster.warning(), or toaster.negative()';
          const ok = (
            <Block marginTop="15px" display="flex" justifyContent="center">
              <Button size={SIZE.compact} onClick={()=>toaster.clear(toastKey)}>Ok</Button>
            </Block>
          );
          const showMore = (<Block marginTop="15px" display="flex" justifyContent="center">
            <Button size={SIZE.compact} onClick={()=>toaster.update(
              toastKey,
              {children: (<>{msg} to show different notification type. {ok}</>)}
            )}>Show more</Button>
          </Block>);
          toastKey = toaster.info((<>{msg}{showMore}</>), {
            onClose: ()=>console.log('Toast closed.'),
            overrides: {InnerContainer: {style: {width: '100%'}}}});
        }}
        >
          Show notification
        </Button>
      `,
      type: PropTypes.ReactNode,
      description: `Additional elements to render in the place where the ToasterContainer is added.
        When 'usePortal' is set to true only the ToasterContainer is rendered with portal into
        the body element but not children.`,
    },
    autoHideDuration: {
      value: '0',
      defaultValue: '0',
      type: PropTypes.Number,
      description: `The number of milliseconds to wait before automatically dismissing a
        notification. This behavior is disabled when the value is set to 0.`,
    },
    usePortal: {
      value: true,
      defaultValue: true,
      type: PropTypes.Boolean,
      description: `Indicates if 'createPortal' is used to append the toaster container to the body element.`,
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'ToastBody', 'ToastInnerContainer', 'ToastCloseIcon'],
        sharedProps: {
          $kind: {
            type: PropTypes.Enum,
            description: 'Defines the type of notification.',
          },
          $closeable: {
            type: PropTypes.Boolean,
            description: `When set to true a close button is displayed
            and the notification can be dismissed by a user.`,
          },
        },
      },
    },
  },
  mapTokensToProps: {
    ToasterContainer: toasterContainerProps,
    Button: buttonProps,
    Block: blockProps,
  },
};

export default toastConfig;
