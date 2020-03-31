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
    marginRight: '.75rem',
  },
  voteExpanded: {
    marginRight: '.5rem',
  },
  voteExpandedDivider: {
    marginTop: '.25rem',
    marginBotton: '.25rem',
    marginLeft: '1.25rem',
    marginRight: '-1rem',
  },
});

export default style;
