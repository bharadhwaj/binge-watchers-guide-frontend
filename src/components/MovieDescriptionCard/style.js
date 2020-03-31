const style = theme => ({
  descriptionArea: {
    paddingTop: '2rem',
    paddingRight: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: '0rem',
    },
  },
  titleArea: {
    marginBottom: '1rem',
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    color: '#424242',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 600,
      fontSize: 26,
    },
    [theme.breakpoints.down('xs')]: {
      fontWeight: 600,
      fontSize: 22,
    },
  },
  watchButton: {
    fontWeight: 600,
    paddingRight: '2rem',
    paddingLeft: '2rem',
    [theme.breakpoints.down('xs')]: {
      fontWeight: 500,
      paddingRight: '1rem',
      paddingLeft: '1rem',
    },
  },
  metadataArea: {
    marginTop: '.5rem',
    marginBottom: '1rem',
  },
  tabArea: {
    marginTop: '.5rem',
  },
  languageIcon: {
    color: '#8097A4',
  },
  deleteIcon: {
    color: '#8097A4',
    marginTop: 6
  },
  languageText: {
    marginLeft: '.75rem',
    fontSize: 16,
    color: '#8097A4',
  },
  typeIcon: {
    color: '#556B84',
  },
  typeText: {
    marginLeft: '.75rem',
    fontSize: 16,
    color: '#556B84',
  },
  genreIcon: {
    color: '#125BA2',
  },
  genreTab: {
    marginLeft: '.75rem',
  },
});

export default style;
