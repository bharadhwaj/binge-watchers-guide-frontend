const style = theme => ({
  addShowElement: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  multipleSelect: {
    border: '1px solid #C3C3C3',
    borderRadius: 4,
  },
  multipleSelectError: {
    border: '1px solid red',
    borderRadius: 4,
  },
  multipleSelectLabel: {
    background: '#FFF',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    backgroundColor: theme.palette.primary,
  },
  lastElement: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5),
  },
});

export default style;
