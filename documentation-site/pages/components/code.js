import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';

const FILTERED = [/^import.*/gim, 'export', 'default'];

const transformCode = code =>
  FILTERED.reduce((acc, token) => acc.replace(token, ''), code);

const Code = ({code, scope}) => {
  return (
    <LiveProvider code={code} scope={scope} transformCode={transformCode}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

export default Code;
