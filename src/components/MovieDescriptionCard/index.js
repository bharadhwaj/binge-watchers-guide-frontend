import React from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import CameraRollRoundedIcon from '@material-ui/icons/CameraRollRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import MovieRoundedIcon from '@material-ui/icons/MovieRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import DeleteIcon from '@material-ui/icons/Delete';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import style from './style';

const MovieDescriptionCard = props => {
  const classes = makeStyles(style)();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const { name, _id, url, created_by, userId, language, type, genres, onDeleteShow } = props;

  const [deleteShowPopupState, setDeleteShowPopupState] = React.useState(false);

  const genreComponent =
    genres &&
    genres.map((genre, index) => (
      <Chip
        key={index}
        className={classes.genreTab}
        variant="outlined"
        color="primary"
        size="small"
        label={genre}
      />
    ));

  const handleDeleteShowSubmit = event => {
    event.preventDefault();
    onDeleteShow(_id);
  };

  return (
    <>
      <Grid className={classes.descriptionArea}>
        <Grid className={classes.titleArea} container justify="space-between">
          <Typography className={classes.title}>{name}</Typography>
          {url && (
            <Button
              className={classes.watchButton}
              variant="contained"
              color="default"
              endIcon={!isMobileView && <OpenInNewRoundedIcon />}
              disableElevation
              onClick={() => window.open(url, '_blank')}
            >
              {isMobileView ? <OpenInNewRoundedIcon /> : 'Watch'}
            </Button>
          )}
          {
            created_by === userId &&
            <DeleteIcon className={classes.deleteIcon} onClick={() => setDeleteShowPopupState(true)}></DeleteIcon>
          }
        </Grid>

        <Divider />

        <Grid className={classes.metadataArea} container>
          <Grid className={classes.tabArea} item xs={12} sm={3}>
            <Grid container alignItems="center">
              <Grid item>
                <LanguageRoundedIcon className={classes.languageIcon} />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.languageText}
                  variant="subtitle2"
                  display="inline"
                >
                  {language}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.tabArea} item xs={12} sm={3}>
            <Grid container alignItems="center">
              <Grid item>
                <CameraRollRoundedIcon className={classes.typeIcon} />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.typeText}
                  variant="subtitle2"
                  display="inline"
                >
                  {type}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.tabArea} item xs={12} sm>
            <Grid container alignItems="center">
              <Grid item>
                <MovieRoundedIcon className={classes.genreIcon} />
              </Grid>
              <Grid item>{genreComponent}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={deleteShowPopupState}
        fullWidth
        maxWidth="sm"
        keepMounted={false}
        onClose={() => setDeleteShowPopupState(false)}
      >
        <DialogTitle id="confirmation-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the show ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDeleteShowPopupState(false)} color="grey">
            CANCEL
          </Button>
          <Button onClick={handleDeleteShowSubmit} color="primary" autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieDescriptionCard;
