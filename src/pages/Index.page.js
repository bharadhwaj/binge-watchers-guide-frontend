import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import FilterAreaMobile from '../components/FilterAreaMobile';
import FilterAreaWeb from '../components/FilterAreaWeb';
import Loading from '../components/Loading';
import MovieDescription from '../components/MovieDescription';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

import {
  loadingAction,
  loginAction,
  registerAction,
  showsAction,
  staticAction,
  toastAction,
  userAction,
} from '../actions';
import { utils } from '../constants';
import {
  loadingSelector,
  showsSelector,
  staticSelector,
  userSelector,
} from '../selectors';

import { logoutUser } from '../utils/users';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPopupState: false,
    };
  }

  setLoginPopupState = popupState => {
    this.setState({ loginPopupState: popupState });
  };

  handleOnDeleteValue = value => {
    const { removeFilter, getAllShows } = this.props;

    if (value.type === utils.FILTER_TYPES.TYPE) {
      removeFilter({ type: value._id });
    } else if (value.type === utils.FILTER_TYPES.LANGUAGE) {
      removeFilter({ language: value._id });
    } else if (value.type === utils.FILTER_TYPES.GENRE) {
      removeFilter({ genre: value._id });
    }

    getAllShows();
  };

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
      addFilter,
      removeFilter,
      resetFilter,
      checkForUsername,
      onRegisterSubmit,
      onLoginSubmit,
      onAddShowSubmit,
      onUpvoteShow,
      onDownvoteShow,
      logoutUser,
      isGetStaticsLoading,
      isCheckUsernameLoading,
      isSubmitLoginLoading,
      isSubmitRegisterLoading,
      isAddShowSubmitLoading,
      isUserLoggedIn,
      isValidUsername,
      userId,
      username,
      types,
      languages,
      genres,
      shows,
      appliedFilters,
    } = this.props;

    const { loginPopupState } = this.state;

    const filterChipComponent =
      appliedFilters &&
      appliedFilters.length > 0 &&
      appliedFilters.map(value => (
        <Chip
          key={value._id + ' ' + value.type}
          variant="outlined"
          color="primary"
          label={value.name}
          onDelete={() => this.handleOnDeleteValue(value)}
          style={{ padding: '.25rem', margin: '.5rem' }}
        />
      ));
    return (
      <>
        {isGetStaticsLoading ? (
          <Loading loading={isGetStaticsLoading} />
        ) : (
          <>
            <>
              <Navbar
                loginPopupState={loginPopupState}
                setLoginPopupState={this.setLoginPopupState}
                redirectToPage={redirectToPage}
                requestToShowToast={requestToShowToast}
                checkForUsername={checkForUsername}
                onRegisterSubmit={onRegisterSubmit}
                onLoginSubmit={onLoginSubmit}
                onAddShowSubmit={onAddShowSubmit}
                getAllShows={getAllShows}
                addFilter={addFilter}
                logoutUser={logoutUser}
                isSubmitLoginLoading={isSubmitLoginLoading}
                isSubmitRegisterLoading={isSubmitRegisterLoading}
                isAddShowSubmitLoading={isAddShowSubmitLoading}
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
                <Grid container justify="center" style={{ paddingTop: '1rem' }}>
                  <Grid item xs={8}>
                    <Search getAllShows={getAllShows} addFilter={addFilter} />
                  </Grid>
                  <Grid item xs={12}>
                    <FilterAreaMobile
                      userId={userId}
                      getAllShows={getAllShows}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                      resetFilter={resetFilter}
                      appliedFilters={appliedFilters}
                      types={types}
                      languages={languages}
                      genres={genres}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="center">
                      <Grid item xs={10}>
                        {filterChipComponent}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
              <Grid item xs={12} md={8}>
                {shows.map(show => (
                  <MovieDescription
                    key={show._id}
                    isUserLoggedIn={isUserLoggedIn}
                    requestToShowToast={requestToShowToast}
                    onUpvoteShow={onUpvoteShow}
                    onDownvoteShow={onDownvoteShow}
                    loginPopupState={loginPopupState}
                    setLoginPopupState={this.setLoginPopupState}
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
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    resetFilter={resetFilter}
                    appliedFilters={appliedFilters}
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
  getAllShows: () => {
    return dispatch(showsAction.getAllShows());
  },
  addFilter: filter => {
    return dispatch(staticAction.addFilter(filter));
  },
  removeFilter: filter => {
    return dispatch(staticAction.removeFilter(filter));
  },
  resetFilter: () => {
    return dispatch(staticAction.resetFilter());
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
  onUpvoteShow: (showId, isUpvote) => {
    dispatch(loadingAction.startVoteShowLoading());
    return dispatch(showsAction.upvoteShow(showId, isUpvote));
  },
  onDownvoteShow: (showId, isDownvote) => {
    dispatch(loadingAction.startVoteShowLoading());
    return dispatch(showsAction.downvoteShow(showId, isDownvote));
  },
});

const mapStateToProps = createStructuredSelector({
  isGetStaticsLoading: loadingSelector.getStaticsLoadingState(),
  isGetAllShowsLoading: loadingSelector.getAllShowsLoadingState(),
  isCheckUsernameLoading: loadingSelector.getCheckUsernameLoadingState(),
  isSubmitLoginLoading: loadingSelector.getLoginLoadingState(),
  isSubmitRegisterLoading: loadingSelector.getRegisterLoadingState(),
  isAddShowSubmitLoading: loadingSelector.getAddShowSubmitLoadingState(),
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  isValidUsername: userSelector.isValidUsername(),
  userId: userSelector.getCurrentUserId(),
  username: userSelector.getCurrentUsername(),
  types: staticSelector.getAllTypes(),
  languages: staticSelector.getAllLanguages(),
  genres: staticSelector.getAllGenres(),
  shows: showsSelector.getAllShows(),
  appliedFilters: staticSelector.getAppliedFilters(),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
