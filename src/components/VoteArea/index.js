import React from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

import { utils } from '../../constants';
import { Divider } from '@material-ui/core';

const VoteArea = props => {
  const classes = makeStyles(style)();

  const {
    isUserLoggedIn,
    requestToShowToast,
    setLoginPopupState,
    onUpvoteShow,
    onDownvoteShow,
    _id,
    upvotes,
    downvotes,
    haveUpvoted,
    haveDownvoted,
  } = props;

  const votes = upvotes - downvotes;

  const [expandedView, setExpandedView] = React.useState(false);

  const onUpvote = () => {
    if (isUserLoggedIn) {
      onUpvoteShow(_id, !haveUpvoted);
    } else {
      setLoginPopupState(true);
      requestToShowToast(
        utils.MESSAGE_VARIANTS.INFO,
        'You have to login to vote.'
      );
    }
  };

  const onDownvote = () => {
    if (isUserLoggedIn) {
      onDownvoteShow(_id, !haveDownvoted);
    } else {
      setLoginPopupState(true);
      requestToShowToast(
        utils.MESSAGE_VARIANTS.INFO,
        'You have to login to vote.'
      );
    }
  };

  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
  };

  const expandedVoteArea = (
    <>
      <Grid container>
        <Grid className={classes.upvoted} item xs={12}>
          <Grid container justify="flex-end">
            <Typography variant="h6">{'+ ' + upvotes}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.voteExpandedDivider} />
        </Grid>

        <Grid className={classes.downvoted} item xs={12}>
          <Grid container justify="flex-end">
            <Typography variant="h6">{'- ' + downvotes}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Grid className={classes.element} item xs={12}>
        <Grid container justify="flex-end">
          <IconButton onClick={onUpvote}>
            <ThumbUpRoundedIcon
              fontSize="large"
              className={clsx(classes.icons, haveUpvoted && classes.upvoted)}
            />
          </IconButton>
        </Grid>
      </Grid>

      <Grid className={classes.element} item xs={12}>
        <Grid container justify="flex-end">
          <IconButton
            className={clsx(expandedView ? classes.voteExpanded : classes.vote)}
            onClick={toggleExpandedView}
          >
            {expandedView ? (
              expandedVoteArea
            ) : (
              <Typography variant="h6">{votes}</Typography>
            )}
          </IconButton>
        </Grid>
      </Grid>

      <Grid className={classes.element} item xs={12}>
        <Grid container justify="flex-end">
          <IconButton onClick={onDownvote}>
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
