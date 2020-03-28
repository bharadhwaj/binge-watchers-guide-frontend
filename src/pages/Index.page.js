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

import { utils } from '../constants';

class IndexPage extends Component {
  render() {
    const { redirectToPage } = this.props;

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

    const types = [
      {
        _id: 1,
        name: 'Movies',
        type: utils.FILTER_TYPES.TYPE,
        isChecked: false,
      },
      {
        _id: 2,
        name: 'Series',
        type: utils.FILTER_TYPES.TYPE,
        isChecked: false,
      },
      {
        _id: 3,
        name: 'Documentary',
        type: utils.FILTER_TYPES.TYPE,
        isChecked: false,
      },
    ];

    const languages = [
      {
        _id: 1,
        name: 'Malayalam',
        type: utils.FILTER_TYPES.LANGUAGE,
        isChecked: false,
      },
      {
        _id: 2,
        name: 'Tamil',
        type: utils.FILTER_TYPES.LANGUAGE,
        isChecked: false,
      },
      {
        _id: 3,
        name: 'Hindi',
        type: utils.FILTER_TYPES.LANGUAGE,
        isChecked: false,
      },
      {
        _id: 4,
        name: 'English',
        type: utils.FILTER_TYPES.LANGUAGE,
        isChecked: false,
      },
      {
        _id: 5,
        name: 'Others',
        type: utils.FILTER_TYPES.LANGUAGE,
        isChecked: false,
      },
    ];

    const genres = [
      {
        _id: 1,
        name: 'Drama',
        type: utils.FILTER_TYPES.GENRE,
        isChecked: false,
      },
      {
        _id: 2,
        name: 'Horror',
        type: utils.FILTER_TYPES.GENRE,
        isChecked: false,
      },
      {
        _id: 3,
        name: 'Sci-fi',
        type: utils.FILTER_TYPES.GENRE,
        isChecked: false,
      },
      {
        _id: 4,
        name: 'Thriller',
        type: utils.FILTER_TYPES.GENRE,
        isChecked: false,
      },
      {
        _id: 5,
        name: 'Comedy',
        type: utils.FILTER_TYPES.GENRE,
        isChecked: false,
      },
      {
        _id: 6,
        name: 'Romantic',
        type: utils.FILTER_TYPES.GENRE,
        isChecked: false,
      },
    ];

    const movieList = recommendations.map(recommendation => (
      <MovieDescription key={recommendation._id} {...recommendation} />
    ));
    return (
      <>
        <>
          <Navbar redirectToPage={redirectToPage} />
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
            {movieList}
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
});

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
