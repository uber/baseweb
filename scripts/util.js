/* eslint-disable flowtype/require-valid-file-annotation */
const path = require('path');
module.exports = {
  getRelativePath(inputPath, outputPath) {
    return path.join(
      path.relative(path.dirname(outputPath), path.dirname(inputPath)),
      path.basename(inputPath),
    );
  },
};
