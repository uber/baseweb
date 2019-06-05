// @flow
import {styled} from 'baseui';
type Props = {hello: string};
// $FlowFixMe
const Component = styled('div', (props: Props) => ({color: 'red'}));
