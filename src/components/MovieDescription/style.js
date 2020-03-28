const style = theme => ({
  cardArea: {
    margin: theme.spacing(3, 1),
  },
  dividerArea: {
    marginLeft: '1rem',
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0rem',
      marginRight: '.75rem',
    },
  },
});

export default style;
