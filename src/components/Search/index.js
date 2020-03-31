import React from 'react';

import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

import style from './style';

const Search = props => {
  const { getAllShows } = props;

  const classes = makeStyles(style)();

  const onTypingInSearch = event => {
    console.log('I AM HERE --- ', event.target.value);
    getAllShows({ q: event.target.value });
  };

  return (
    <Grid className={classes.search}>
      <Grid className={classes.searchIcon}>
        <SearchIcon />
      </Grid>
      <InputBase
        onChange={onTypingInSearch}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Grid>
  );
};

export default Search;
