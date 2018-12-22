const prod = process.env.BUILD_ENV === 'production';

module.exports = {
  'process.env.EXAMPLE_ROOT': prod
    ? '/beta/static/examples/'
    : '/static/examples/',
};
