import React from 'react';
import {Button} from 'baseui/button';
import Upload from 'baseui/icon/upload';

function UploadEnchancer() {
  return <Upload size={24} />;
}

export default () => (
  <Button endEnhancer={UploadEnchancer}>End Enhancer</Button>
);
