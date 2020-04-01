const style = theme => ({
  sortArea: {
    padding: theme.spacing(2, 1),
  },
  sortTitle: {
    fontSize: 22,
    [theme.breakpoints.down('xm')]: {
      fontSize: 19,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
});

export default style;
