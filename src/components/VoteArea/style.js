const style = theme => ({
  element: {
    padding: '.25rem, 0rem',
  },
  icons: {
    color: theme.palette.text.secondary,
  },
  upvoted: {
    color: theme.palette.success.light,
  },
  downvoted: {
    color: theme.palette.error.light,
  },
  vote: {
    marginRight: '1rem',
  },
});

export default style;
