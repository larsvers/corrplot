const state = {
  colours: {
    background: '#fefefe',
    gridBase: '#eee',
    gridPositive: '#62A9EB',
    gridNegative: '#F18E75',
  },
  grid: {
    full: null,
    lowerHalf: null,
    quality: null,
  },
  zoom: {
    norm: {
      mobile: 0.8,
      desktop: 1,
    },
    in: {
      mobile: 1,
      desktop: 1.5,
    },
  },
  screen: 'desktop',
};

export default state;
