// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {Drawer, ANCHOR} from 'baseui/drawer';

export default () => {
  const initialState = {
    bottom: false,
    top: false,
    left: false,
    right: false,
  };
  const [isOpen, setIsOpen] = React.useState(initialState);

  function close(anchorType) {
    setIsOpen({...isOpen, [(anchorType: string)]: false});
  }

  return (
    <React.Fragment>
      {Object.keys(ANCHOR).map(eachAnchor => (
        <React.Fragment>
          <Button
            onClick={() =>
              setIsOpen({...isOpen, [(eachAnchor: string)]: true})
            }
            overrides={{
              BaseButton: {
                style: {
                  marginTop: '12px',
                  marginBottom: '12px',
                  marginLeft: '12px',
                  marginRight: '12px',
                },
              },
            }}
          >
            Open Drawer on {eachAnchor}
          </Button>
          <Drawer
            onClose={() => close(eachAnchor)}
            isOpen={isOpen[eachAnchor]}
            anchor={eachAnchor}
          >
            Proin ut dui sed metus pharetra hend rerit vel non mi.
            Nulla ornare faucibus ex, non facilisis nisl. Maecenas
            aliquet mauris ut tempus.
          </Drawer>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
