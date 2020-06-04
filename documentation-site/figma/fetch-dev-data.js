// Fetch Figma data for local use while in development.
// The API is just too slow otherwise.

const fs = require('fs');
const {join} = require('path');
const fetch = require('node-fetch');
const argv = require('minimist')(process.argv.slice(2));

const {
  getStaticPropsForIndex,
  getStaticPathsForNode,
  getStaticPropsForNode,
} = require('./api.js');

let imageFillsCache = null;
let figmaFileCache = null;

main();

// Example: Reload a specific node:
// yarn figma:load -r 15665-64919

async function main() {
  let indexStaticProps;
  let nodeStaticPaths;

  if (!argv.r) {
    console.log('fetching indexStaticProps...');
    indexStaticProps = await getStaticPropsForIndex();
    fs.writeFileSync(
      join(
        process.cwd(),
        'documentation-site/figma/data/indexStaticProps.json',
      ),
      JSON.stringify(indexStaticProps),
    );
    console.log('done');

    console.log('fetching nodeStaticPaths...');
    nodeStaticPaths = await getStaticPathsForNode();
    fs.writeFileSync(
      join(process.cwd(), 'documentation-site/figma/data/nodeStaticPaths.json'),
      JSON.stringify(nodeStaticPaths),
    );
    console.log('done');
  }

  const paths = argv.r ? [{params: {node: argv.r}}] : nodeStaticPaths.paths;
  for (let path of paths) {
    console.log(`Fetching nodeStaticProps for node [${path.params.node}]...`);
    const staticProps = await getStaticPropsForNode(path);
    fs.writeFileSync(
      join(
        process.cwd(),
        `documentation-site/figma/data/nodeStaticProps[${path.params.node}].json`,
      ),
      JSON.stringify(staticProps),
    );
    console.log('done');
  }
}
