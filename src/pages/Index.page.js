import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import FilterAreaMobile from '../components/FilterAreaMobile';
import FilterAreaWeb from '../components/FilterAreaWeb';
import Loading from '../components/Loading';
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
import {
  loadingSelector,
  showsSelector,
  staticSelector,
  userSelector,
} from '../selectors';

import { logoutUser } from '../utils/users';

class IndexPage extends Component {
  componentDidMount() {
    const { getAllStatics, getAllShows, userId } = this.props;

    getAllStatics();
    getAllShows({ userId });
  }

  render() {
    const {
      redirectToPage,
      requestToShowToast,
      getAllShows,
      checkForUsername,
      onRegisterSubmit,
      onLoginSubmit,
      onAddShowSubmit,
      logoutUser,
      isGetStaticsLoading,
      isCheckUsernameLoading,
      isSubmitLoginLoading,
      isUserLoggedIn,
      isValidUsername,
      userId,
      username,
      types,
      languages,
      genres,
      shows,
    } = this.props;

    return (
      <>
        {isGetStaticsLoading ? (
          <Loading loading={isGetStaticsLoading} />
        ) : (
          <>
            <>
              <Navbar
                redirectToPage={redirectToPage}
                requestToShowToast={requestToShowToast}
                checkForUsername={checkForUsername}
                onRegisterSubmit={onRegisterSubmit}
                onLoginSubmit={onLoginSubmit}
                onAddShowSubmit={onAddShowSubmit}
                logoutUser={logoutUser}
                isSubmitLoginLoading={isSubmitLoginLoading}
                isCheckUsernameLoading={isCheckUsernameLoading}
                isUserLoggedIn={isUserLoggedIn}
                isValidUsername={isValidUsername}
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
                    userId={userId}
                    getAllShows={getAllShows}
                    types={types}
                    languages={languages}
                    genres={genres}
                  />
                </Grid>
              </Hidden>
              <Grid item xs={12} md={8}>
                {shows.map(show => (
                  <MovieDescription
                    key={show._id}
                    {...show}
                    type={types && types[show.type] && types[show.type].name}
                    language={
                      languages &&
                      languages[show.language] &&
                      languages[show.language].name
                    }
                    genres={show.genres.map(
                      genreId =>
                        genres && genres[genreId] && genres[genreId].name
                    )}
                  />
                ))}
              </Grid>
              <Hidden smDown>
                <Grid item md>
                  <FilterAreaWeb
                    userId={userId}
                    getAllShows={getAllShows}
                    types={types}
                    languages={languages}
                    genres={genres}
                  />
                </Grid>
              </Hidden>
            </Grid>
          </>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  redirectToPage: url => {
    return dispatch(push(url));
  },
  getAllStatics: () => {
    dispatch(loadingAction.startGetStaticsLoading());
    return dispatch(staticAction.getAllStatics());
  },
  getAllShows: filter => {
    return dispatch(showsAction.getAllShows(filter));
  },
  requestToShowToast: (variant, message) => {
    return dispatch(toastAction.requestToShowToast(variant, message));
  },
  checkForUsername: username => {
    dispatch(loadingAction.startCheckUsernameLoading());
    return dispatch(registerAction.checkUsername(username));
  },
  onRegisterSubmit: (username, password) => {
    dispatch(loadingAction.startRegisterLoading());
    return dispatch(registerAction.registerUser(username, password));
  },
  onLoginSubmit: (username, password) => {
    dispatch(loadingAction.startLoginLoading());
    return dispatch(loginAction.submitForLogin(username, password));
  },
  onAddShowSubmit: show => {
    dispatch(loadingAction.startAddShowLoading());
    return dispatch(showsAction.addShow(show));
  },
  logoutUser: () => {
    logoutUser();
    dispatch(showsAction.resetVotes());
    return dispatch(userAction.resetUserData());
  },
});

const mapStateToProps = createStructuredSelector({
  isGetStaticsLoading: loadingSelector.getStaticsLoadingState(),
  isGetAllShowsLoading: loadingSelector.getAllShowsLoadingState(),
  isCheckUsernameLoading: loadingSelector.getCheckUsernameLoadingState(),
  isSubmitLoginLoading: loadingSelector.getLoginLoadingState(),
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  isValidUsername: userSelector.isValidUsername(),
  userId: userSelector.getCurrentUserId(),
  username: userSelector.getCurrentUsername(),
  types: staticSelector.getAllTypes(),
  languages: staticSelector.getAllLanguages(),
  genres: staticSelector.getAllGenres(),
  shows: showsSelector.getAllShows(),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
