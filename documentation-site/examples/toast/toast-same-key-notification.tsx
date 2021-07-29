// @flow
import * as React from 'react';
import {toaster, ToasterContainer} from 'baseui/toast';
import {Button, SIZE} from 'baseui/button';
import {Block} from 'baseui/block';

export default function Example() {
  const [count, setCount] = React.useState(0);
  return (
    <React.Fragment>
      <ToasterContainer />
      <Button
        onClick={() => {
          setCount(count + 1);
          let toastKey: React.Key = '';
          const msg = `Click count: ${count}`;
          const ok = (
            <Block
              marginTop="15px"
              display="flex"
              justifyContent="center"
            >
              <Button
                size={SIZE.compact}
                onClick={() => toaster.clear(toastKey)}
              >
                Ok
              </Button>
            </Block>
          );
          const showMore = (
            <Block
              marginTop="15px"
              display="flex"
              justifyContent="center"
            >
              <Button
                size={SIZE.compact}
                onClick={() =>
                  toaster.update(toastKey, {
                    children: (
                      <React.Fragment>
                        {msg} button clicks have been detected. {ok}
                      </React.Fragment>
                    ),
                  })
                }
              >
                Show more
              </Button>
            </Block>
          );
          const toastMethods = [
            toaster.info,
            toaster.negative,
            toaster.positive,
            toaster.warning,
          ];
          const toastMethod = toastMethods[count % 4];
          toastKey = toastMethod.call(
            toaster,
            <React.Fragment>
              {msg}
              {showMore}
            </React.Fragment>,
            {
              key: 'same-key',
              onClose: () => console.log('Toast closed.'),
              overrides: {
                InnerContainer: {
                  style: {width: '100%'},
                },
              },
            },
          );
        }}
      >
        Show notification
      </Button>
    </React.Fragment>
  );
}
