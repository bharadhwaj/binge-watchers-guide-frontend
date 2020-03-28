import React from 'react';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import MovieDescriptionCard from '../MovieDescriptionCard';
import VoteArea from '../VoteArea';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

const MovieDescription = props => {
  const classes = makeStyles(style)();

  return (
    <>
      <Card className={classes.cardArea}>
        <Grid container alignItems="center">
          <Grid item xs={2} sm={1}>
            <VoteArea {...props} />
          </Grid>

          <Divider
            className={classes.dividerArea}
            orientation="vertical"
            flexItem
          />

          <Grid item xs={9} sm>
            <MovieDescriptionCard {...props} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default MovieDescription;
