import React from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

const VoteArea = props => {
  const classes = makeStyles(style)();

  const { upvotes, downvotes, haveUpvoted, haveDownvoted } = props;

  const votes = upvotes - downvotes;

  return (
    <>
      <Grid className={classes.element} item xs={12}>
        <Grid container justify="flex-end">
          <IconButton>
            <ThumbUpRoundedIcon
              fontSize="large"
              className={clsx(classes.icons, haveUpvoted && classes.upvoted)}
            />
          </IconButton>
        </Grid>
      </Grid>

      <Grid className={classes.element} item xs={12}>
        <Grid container justify="flex-end">
          <Typography className={classes.vote} variant="h6">
            {votes}
          </Typography>
        </Grid>
      </Grid>

      <Grid className={classes.element} item xs={12}>
        <Grid container justify="flex-end">
          <IconButton>
            <ThumbDownRoundedIcon
              fontSize="large"
              className={clsx(
                classes.icons,
                !haveUpvoted && haveDownvoted && classes.downvoted
              )}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default VoteArea;
