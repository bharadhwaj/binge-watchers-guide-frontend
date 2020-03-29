import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import FilterAreaMobile from '../components/FilterAreaMobile';
import FilterAreaWeb from '../components/FilterAreaWeb';
import MovieDescription from '../components/MovieDescription';
import Navbar from '../components/Navbar';

import {
  loadingAction,
  loginAction,
  registerAction,
  showsAction,
  staticAction,
  toastAction,
  userAction,
} from '../actions';
import { showsSelector, staticSelector, userSelector } from '../selectors';

import { logoutUser } from '../utils/users';

class IndexPage extends Component {
  componentDidMount() {
    const { getAllStatics, getAllShows } = this.props;

    getAllStatics();
    getAllShows();
  }

  render() {
    const {
      redirectToPage,
      requestToShowToast,
      onRegisterSubmit,
      onLoginSubmit,
      logoutUser,
      isUserLoggedIn,
      username,
      types,
      languages,
      genres,
      shows,
    } = this.props;

    return (
      <>
        <>
          <Navbar
            redirectToPage={redirectToPage}
            requestToShowToast={requestToShowToast}
            onRegisterSubmit={onRegisterSubmit}
            onLoginSubmit={onLoginSubmit}
            logoutUser={logoutUser}
            isUserLoggedIn={isUserLoggedIn}
            username={username}
            types={types}
            languages={languages}
            genres={genres}
          />
        </>
        <Grid container justify="flex-start">
          <Hidden mdUp>
            <Grid item xs={12}>
              <FilterAreaMobile
                types={types}
                languages={languages}
                genres={genres}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={8}>
            {shows.map(show => (
              <MovieDescription key={show._id} {...show} />
            ))}
          </Grid>
          <Hidden smDown>
            <Grid item md>
              <FilterAreaWeb
                types={types}
                languages={languages}
                genres={genres}
              />
            </Grid>
          </Hidden>
        </Grid>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  redirectToPage: url => {
    return dispatch(push(url));
  },
  getAllStatics: () => {
    return dispatch(staticAction.getAllStatics());
  },
  getAllShows: () => {
    return dispatch(showsAction.getAllShows());
  },
  requestToShowToast: (variant, message) => {
    return dispatch(toastAction.requestToShowToast(variant, message));
  },
  checkUsername: username => {
    dispatch(loadingAction.startRegisterLoading());
    return dispatch(registerAction.registerUser(username));
  },
  onRegisterSubmit: (username, password) => {
    dispatch(loadingAction.startRegisterLoading());
    return dispatch(registerAction.registerUser(username, password));
  },
  onLoginSubmit: (username, password) => {
    dispatch(loadingAction.startLoginLoading());
    return dispatch(loginAction.submitForLogin(username, password));
  },
  logoutUser: () => {
    logoutUser();
    return dispatch(userAction.resetUserData());
  },
});

const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  username: userSelector.getCurrentUsername(),
  types: staticSelector.getAllTypes(),
  languages: staticSelector.getAllLanguages(),
  genres: staticSelector.getAllGenres(),
  shows: showsSelector.getAllShows(),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
