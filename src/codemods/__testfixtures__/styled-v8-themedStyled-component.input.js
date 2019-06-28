// @flow
import {styled} from 'baseui';

type CustomTheme = {color: string};

function A(props) {
  return <div className={props.className}>abcd</div>;
}

const B = styled<typeof A, {}, CustomTheme>(A, props => {
  return {color: props.$theme.color};
});
