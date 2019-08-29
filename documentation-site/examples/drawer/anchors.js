// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {Drawer, ANCHOR} from 'baseui/drawer';

export default () => {
  let initialState = {};
  for (let anchor in ANCHOR) {
    initialState[anchor] = false;
  }
  const [isOpen, setIsOpen] = React.useState(initialState);

  function close(anchorType) {
    setIsOpen({...isOpen, [anchorType]: false});
  }

  return (
    <React.Fragment>
      {Object.keys(ANCHOR).map(eachAnchor => (
        <React.Fragment>
          <Button
            style={{margin: 12}}
            onClick={() =>
              setIsOpen({...isOpen, [eachAnchor]: true})
            }
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
