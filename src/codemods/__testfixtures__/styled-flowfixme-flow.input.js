// @flow
import {styled} from 'baseui';
type Props = {hello: string};
const Component = styled('div', (props: Props) => ({color: 'red'}));
