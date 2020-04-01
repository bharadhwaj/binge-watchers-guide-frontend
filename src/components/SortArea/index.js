import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

const SortArea = props => {
  const classes = makeStyles(style)();

  const [sort, setSortValue] = React.useState('-');

  const handleChangeSortBy = event => {
    const { setSortAndOrder, getAllShows } = props;
    setSortValue(event.target.value);
    const [sort, order] = event.target.value.split('-');
    setSortAndOrder(sort, order);
    getAllShows();
  };

  return (
    <>
      <Grid className={classes.sortArea} container alignItems="center">
        <Grid item xs={3}>
          <Typography className={classes.sortTitle} variant="h6" gutterBottom>
            Sort By
          </Typography>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="sort-area-label">Sort by</InputLabel>
            <Select
              labelId="sort-area-label"
              id="sort-area-select"
              value={sort}
              onChange={handleChangeSortBy}
              label="Sort by"
            >
              <MenuItem value={'-'}>Recently Added</MenuItem>
              <MenuItem value={'created_at-asc'}>Oldest Post</MenuItem>
              <MenuItem value={'popular-desc'}>Most Popular</MenuItem>
              <MenuItem value={'popular-asc'}>Least Popular</MenuItem>
              <MenuItem value={'vote-desc'}>Most Upvoted</MenuItem>
              <MenuItem value={'vote-asc'}>Most Downvoted</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default SortArea;
