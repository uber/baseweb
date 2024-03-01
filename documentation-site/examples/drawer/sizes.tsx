import * as React from "react";
import { Button } from "baseui/button";
import { Drawer, SIZE } from "baseui/drawer";

export default function Example() {
  let initialState: { [key: string]: boolean } = {};
  for (let size in SIZE) {
    initialState[size] = false;
  }
  const [isOpen, setIsOpen] = React.useState(initialState);

  function close(sizeType: string) {
    setIsOpen({ ...isOpen, [sizeType]: false });
  }

  return (
    <React.Fragment>
      {Object.keys(SIZE).map((eachSize) => (
        <React.Fragment>
          <Button
            onClick={() => setIsOpen({ ...isOpen, [eachSize]: true })}
            overrides={{
              BaseButton: {
                style: {
                  marginTop: "12px",
                  marginBottom: "12px",
                  marginLeft: "12px",
                  marginRight: "12px",
                },
              },
            }}
          >
            Open Drawer of {eachSize} size
          </Button>
          <Drawer
            onClose={() => close(eachSize)}
            isOpen={isOpen[eachSize]}
            size={eachSize}
          >
            Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
            faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
          </Drawer>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
