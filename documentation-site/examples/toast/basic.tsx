import * as React from 'react';
import {toaster, ToasterContainer, PLACEMENT} from 'baseui/toast';
import {Button} from 'baseui/button';

class ToasterExample extends React.Component {
  add = () => {
    toaster.info(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      {
        autoHideDuration: 5000,
      },
    );
  };

  render() {
    return <Button onClick={this.add}>Info toast</Button>;
  }
}

export default function Example() {
  return (
    <React.Fragment>
      <ToasterContainer placement={PLACEMENT.bottomRight} />
      <ToasterExample />
    </React.Fragment>
  );
}
