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

import { staticAction, toastAction } from '../actions';
import { staticSelector, userSelector } from '../selectors';

class IndexPage extends Component {
  componentDidMount() {
    const { getAllStatics } = this.props;

    getAllStatics();
  }

  render() {
    const {
      redirectToPage,
      requestToShowToast,
      isUserLoggedIn,
      types,
      languages,
      genres,
    } = this.props;

    const recommendations = [
      {
        _id: '1',
        name: 'Kumbalangi Nights',
        url: 'https://www.primevideo.com/detail/0IIH4C2IQSRU9B8L3F4XOLI5WH/',
        language: 'Malayalam',
        type: 'Movie',
        genre: ['Drama', 'Thriller'],
        upvotes: 12,
        downvotes: 2,
        haveUpvoted: true,
        haveDownvoted: false,
      },
      {
        _id: '2',
        name: 'The Prestige',
        url:
          'https://www.primevideo.com/region/eu/detail/0NHF8XHW3MHY857TGPSWTYCXTI/',
        language: 'English',
        type: 'Movie',
        genre: ['Drama', 'Suspense'],
        upvotes: 28,
        downvotes: 4,
        haveUpvoted: false,
        haveDownvoted: true,
      },
      {
        _id: '3',
        name: 'Kumbalangi Nights',
        url: 'https://www.primevideo.com/detail/0IIH4C2IQSRU9B8L3F4XOLI5WH/',
        language: 'Malayalam',
        type: 'Movie',
        genre: ['Drama', 'Thriller'],
        upvotes: 12,
        downvotes: 2,
        haveUpvoted: true,
        haveDownvoted: false,
      },
      {
        _id: '4',
        name: 'The Prestige',
        url:
          'https://www.primevideo.com/region/eu/detail/0NHF8XHW3MHY857TGPSWTYCXTI/',
        language: 'English',
        type: 'Movie',
        genre: ['Drama', 'Suspense'],
        upvotes: 28,
        downvotes: 4,
        haveUpvoted: false,
        haveDownvoted: true,
      },
      {
        _id: '5',
        name: 'Kumbalangi Nights',
        url: 'https://www.primevideo.com/detail/0IIH4C2IQSRU9B8L3F4XOLI5WH/',
        language: 'Malayalam',
        type: 'Movie',
        genre: ['Drama', 'Thriller'],
        upvotes: 12,
        downvotes: 2,
        haveUpvoted: true,
        haveDownvoted: false,
      },
      {
        _id: '6',
        name: 'The Prestige',
        url:
          'https://www.primevideo.com/region/eu/detail/0NHF8XHW3MHY857TGPSWTYCXTI/',
        language: 'English',
        type: 'Movie',
        genre: ['Drama', 'Suspense'],
        upvotes: 28,
        downvotes: 4,
        haveUpvoted: false,
        haveDownvoted: true,
      },
    ];

    return (
      <>
        <>
          <Navbar
            redirectToPage={redirectToPage}
            requestToShowToast={requestToShowToast}
            isUserLoggedIn={isUserLoggedIn}
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
            {recommendations.map(recommendation => (
              <MovieDescription key={recommendation._id} {...recommendation} />
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
  requestToShowToast: (variant, message) => {
    return dispatch(toastAction.requestToShowToast(variant, message));
  },
});

const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  types: staticSelector.getAllTypes(),
  languages: staticSelector.getAllLanguages(),
  genres: staticSelector.getAllGenres(),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
