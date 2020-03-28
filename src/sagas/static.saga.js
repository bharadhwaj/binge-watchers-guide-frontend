import { all, put, takeEvery } from '@redux-saga/core/effects';

import { staticAction } from '../actions';

import { actions, utils } from '../constants';

function* getAllStaticsWorker() {
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

  // const updatedTypes = types.map(typeObj => ({
  //   ...typeObj,
  //   type: utils.FILTER_TYPES.TYPE,
  // }));

  // const updatedLanguages = languages.map(languageObj => ({
  //   ...languageObj,
  //   type: utils.FILTER_TYPES.LANGUAGE,
  // }));

  // const updatedGenres = genres.map(genreObj => ({
  //   ...genreObj,
  //   type: utils.FILTER_TYPES.GENRE,
  // }));

  yield put(staticAction.updateTypeData(types));
  yield put(staticAction.updateLanguageData(languages));
  yield put(staticAction.updateGenreData(genres));
}

function* getAllStaticsWatcher() {
  yield takeEvery(actions.STATIC.GET_ALL_STATICS, getAllStaticsWorker);
}

export default function* staticSaga() {
  yield all([getAllStaticsWatcher()]);
}
