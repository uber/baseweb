const theme = {
  plain: {
    fontSize: '14px',
    color: '#333',
    backgroundColor: 'rgb(253, 253, 253)',
    fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    margin: 0,
  },
  styles: [
    {
      types: ['comment', 'punctuation'],
      style: {
        color: 'rgb(170, 170, 170)',
      },
    },
    {
      types: ['operator'],
      style: {
        color: 'rgb(119, 119, 119)',
      },
    },
    {
      types: ['builtin', 'variable', 'constant', 'number', 'char', 'symbol'],
      style: {
        color: 'rgb(156, 93, 39)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(170, 55, 49)',
      },
    },
    {
      types: ['string'],
      style: {
        color: 'rgb(68, 140, 39)',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'rgb(75, 105, 198)',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'rgb(129, 144, 160)',
      },
    },
    {
      types: ['selector'],
      style: {
        color: 'rgb(122, 62, 157)',
      },
    },
    {
      types: ['keyword'],
      style: {},
    },
    {
      types: ['changed'],
      style: {
        color: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 221)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 221, 221)',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(221, 255, 221)',
      },
    },
  ],
};

export default theme;
