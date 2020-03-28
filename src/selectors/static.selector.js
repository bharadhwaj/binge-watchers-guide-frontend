import { createSelector } from 'reselect';

const selectStaticState = state => state.static;

export const getAllTypes = () =>
  createSelector(selectStaticState, staticState => staticState.types);

export const getAllLanguages = () =>
  createSelector(selectStaticState, staticState => staticState.languages);

export const getAllGenres = () =>
  createSelector(selectStaticState, staticState => staticState.genres);
