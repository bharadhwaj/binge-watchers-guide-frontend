import React from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import CameraRollRoundedIcon from '@material-ui/icons/CameraRollRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import MovieRoundedIcon from '@material-ui/icons/MovieRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import style from './style';
import { getCompleteUrl } from '../../utils/lib';

const MovieDescriptionCard = props => {
  const classes = makeStyles(style)();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    name,
    _id,
    url,
    created_by,
    userId,
    language,
    type,
    genres,
    onDeleteShow,
  } = props;

  const [hamburgerElement, setHamburgerElement] = React.useState(null);
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

  const handleHamburgerOpen = event => {
    setHamburgerElement(event.currentTarget);
  };

  const handleHamburgerClose = () => {
    setHamburgerElement(null);
  };

  const handleDeleteShowSubmit = event => {
    event.preventDefault();
    onDeleteShow(_id);
  };

  const handleCancelDelete = () => {
    setHamburgerElement(null);
    setDeleteShowPopupState(false);
  };

  return (
    <>
      <Grid className={classes.descriptionArea}>
        <Grid className={classes.titleArea} container justify="space-between">
          <Grid item>
            <Typography className={classes.title}>{name}</Typography>
          </Grid>
          <Grid item>
            {url && (
              <Button
                className={classes.watchButton}
                variant="contained"
                color="default"
                endIcon={!isMobileView && <OpenInNewRoundedIcon />}
                disableElevation
                onClick={() => window.open(getCompleteUrl(url), '_blank')}
              >
                {isMobileView ? <OpenInNewRoundedIcon /> : 'Watch'}
              </Button>
            )}
            {created_by === userId && (
              <IconButton
                className={classes.sideHamburger}
                onClick={handleHamburgerOpen}
              >
                <MoreVertRoundedIcon />
              </IconButton>
            )}
          </Grid>
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

      <Menu
        id="hamburger-menu"
        anchorEl={hamburgerElement}
        keepMounted
        open={Boolean(hamburgerElement)}
        onClose={handleHamburgerClose}
      >
        <MenuItem onClick={() => setDeleteShowPopupState(true)}>
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteShowPopupState}
        fullWidth
        maxWidth="sm"
        keepMounted={false}
        onClose={handleCancelDelete}
      >
        <DialogContent>
          <Typography variant="h5">Delete</Typography>
          <DialogContentText>
            Are you sure you want to delete the show ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelDelete} color="grey">
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
