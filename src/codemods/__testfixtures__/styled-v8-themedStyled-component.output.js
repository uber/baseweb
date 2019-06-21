// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme = {color: string};

function A(props) {
  return <div className={props.className}>abcd</div>;
}

const themedStyled1 = createThemedStyled<CustomTheme>();

const B = themedStyled1<typeof A, {}>(A, props => {
  return {color: props.$theme.color};
});
