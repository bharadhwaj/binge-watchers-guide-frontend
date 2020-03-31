import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import AddShow from '../AddShow';
import ElevationScroll from '../ElevationScroll';
import Login from '../Login';
import Register from '../Register';
import Search from '../Search';
import SlideTransition from '../SlideTransition';

import style from './style';

import { utils } from '../../constants';

const Navbar = props => {
  const {
    redirectToPage,
    requestToShowToast,
    checkForUsername,
    onRegisterSubmit,
    onLoginSubmit,
    onAddShowSubmit,
    getAllShows,
    logoutUser,
    isSubmitRegisterLoading,
    isSubmitLoginLoading,
    isAddShowSubmitLoading,
    isCheckUsernameLoading,
    isUserLoggedIn,
    isValidUsername,
    loginPopupState,
    setLoginPopupState,
    username,
    types,
    languages,
    genres,
  } = props;

  const classes = makeStyles(style)();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  const [registerPopupState, setRegisterPopupState] = React.useState(false);
  const [addShowPopupState, setAddShowPopupState] = React.useState(false);

  React.useEffect(() => {
    setLoginPopupState(false);
    setRegisterPopupState(false);
  }, [isUserLoggedIn, setLoginPopupState]);

  React.useEffect(() => {
    if (!isAddShowSubmitLoading) {
      setAddShowPopupState(false);
    }
  }, [isAddShowSubmitLoading]);

  const handleLogout = () => {
    logoutUser();
  };

  const handleOpenLoginPopup = () => {
    setLoginPopupState(true);
  };

  const handleCloseLoginPopup = () => {
    setLoginPopupState(false);
  };

  const handleOpenRegisterPopup = () => {
    setRegisterPopupState(true);
  };

  const handleCloseRegisterPopup = () => {
    setRegisterPopupState(false);
  };

  const handleOpenAddShowPopup = () => {
    if (isUserLoggedIn) {
      setAddShowPopupState(true);
    } else {
      requestToShowToast(
        utils.MESSAGE_VARIANTS.INFO,
        'You have to login first.'
      );
      setLoginPopupState(true);
    }
  };

  const handleCloseAddShowPopup = () => {
    if (isUserLoggedIn) {
      setAddShowPopupState(false);
    } else {
      setLoginPopupState(false);
    }
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar className={classes.navbar} position="sticky" elevation={0}>
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <img
                  className={classes.logo}
                  src={isMobileView ? '/bwg_mobile_logo.png' : '/bwg_logo.png'}
                  alt="Binge Watcher's Guide"
                  onClick={() => redirectToPage('/')}
                />
              </Grid>
              <Grid item>
                <Grid container justify="space-between" alignItems="center">
                  {!isMobileView && (
                    <Grid item xs>
                      <Search getAllShows={getAllShows} />
                    </Grid>
                  )}
                  <Grid item xs>
                    {isMobileView ? (
                      <IconButton onClick={handleOpenAddShowPopup}>
                        <LibraryAddRoundedIcon color="primary" />
                      </IconButton>
                    ) : (
                      <Grid container justify="center" alignItems="center">
                        <Button
                          color="primary"
                          size="large"
                          startIcon={<LibraryAddRoundedIcon />}
                          onClick={handleOpenAddShowPopup}
                        >
                          Add your entry
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs>
                    {isUserLoggedIn ? (
                      <Grid container justify="center" alignItems="center">
                        <Button
                          color="primary"
                          size="large"
                          startIcon={<ExitToAppRoundedIcon />}
                          onClick={handleLogout}
                        >
                          Logout ({username})
                        </Button>
                      </Grid>
                    ) : isMobileView ? (
                      <IconButton onClick={handleOpenLoginPopup}>
                        <PersonAddRoundedIcon color="primary" />
                      </IconButton>
                    ) : (
                      <Grid container justify="center" alignItems="center">
                        <Button
                          color="primary"
                          size="large"
                          startIcon={<PersonAddRoundedIcon />}
                          onClick={handleOpenLoginPopup}
                        >
                          Login
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Dialog
        open={loginPopupState}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="sm"
        keepMounted={false}
        onClose={handleCloseLoginPopup}
      >
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <IconButton onClick={handleCloseLoginPopup}>
                  <CloseRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Login
                onLoginSubmit={onLoginSubmit}
                isSubmitLoginLoading={isSubmitLoginLoading}
                handleOpenRegisterPopup={handleOpenRegisterPopup}
                handleCloseLoginPopup={handleCloseLoginPopup}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        open={registerPopupState}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="sm"
        keepMounted={false}
        onClose={handleCloseRegisterPopup}
      >
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <IconButton onClick={handleCloseRegisterPopup}>
                  <CloseRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Register
                checkForUsername={checkForUsername}
                isSubmitRegisterLoading={isSubmitRegisterLoading}
                isCheckUsernameLoading={isCheckUsernameLoading}
                isValidUsername={isValidUsername}
                onRegisterSubmit={onRegisterSubmit}
                handleOpenLoginPopup={handleOpenLoginPopup}
                handleCloseRegisterPopup={handleCloseRegisterPopup}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        open={addShowPopupState}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="sm"
        keepMounted={false}
        onClose={handleCloseAddShowPopup}
      >
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <IconButton onClick={handleCloseAddShowPopup}>
                  <CloseRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AddShow
                isAddShowSubmitLoading={isAddShowSubmitLoading}
                onAddShowSubmit={onAddShowSubmit}
                types={types}
                languages={languages}
                genres={genres}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
