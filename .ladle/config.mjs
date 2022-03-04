export default {
  define: {
    __BROWSER__: true,
    __NODE__: false,
  },
  build: {
    define: {
      __DEV__: false,
    },
  },
  serve: {
    define: {
      __DEV__: true,
    },
  },
};
