import pick from 'just-pick';
import {toaster, ToasterContainer, Toast, KIND, PLACEMENT} from 'baseui/toast';
import {Button, SIZE} from 'baseui/button';
import {Block} from 'baseui/block';
import {PropTypes} from '../const';
import {changeHandlers} from './common';
import {TConfig} from '../types';

const toastConfig: TConfig = {
  imports: {
    'baseui/toast': {
      named: ['toaster', 'ToasterContainer', 'Toast'],
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
    Toast,
    KIND,
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
          const msg = 'This is an info notification.';
          const showMore = (<Block marginTop="15px" display="flex" justifyContent="center">
            <Button size={SIZE.compact} onClick={()=>toaster.update(
              toastKey, 
              {children: (<>{msg} And extended notification details. {ok}</>)}
            )}>Show more</Button>
          </Block>);
          const ok = (
            <Block marginTop="15px" display="flex" justifyContent="center"> 
              <Button size={SIZE.compact} onClick={()=>toaster.clear(toastKey)}>Ok</Button> 
            </Block>
          );
          toastKey = toaster.info((<>{msg}{showMore}</>), {closeable: false, overrides: {InnerContainer: {style: {width: '100%'}}}});
        }}
        >
          Info
        </Button>
        <Block marginRight="15px"/>
        <Button onClick={()=>{toaster.positive('This is a confirmation notification.', {onClose: ()=>console.log('Toast closed.')})}}>
          Positive
        </Button>
        <Block marginRight="15px"/>
        <Button onClick={()=>{toaster.warning('This is a warning notification.')}}>
          Warning
        </Button>
        <Block marginRight="15px"/>
        <Button onClick={()=>{toaster.negative('This is a negative notification.')}}>
          Negative
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
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Root', 'ToastBody', 'ToastInnerContainer', 'ToastCloseIcon'],
      sharedProps: {
        $kind: 'kind',
        $closeable: 'closeable',
      },
    },
  },
};

export default toastConfig;
