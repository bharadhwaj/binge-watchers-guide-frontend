import { createSelector } from 'reselect';

const selectTypes = state => state.static.types;
const selectLanguages = state => state.static.languages;
const selectGenres = state => state.static.genres;
const selectFilter = state => state.static.filter;
const selectAppliedFilters = state => state.static.appliedFilters;

export const getAllTypes = () =>
  createSelector([selectTypes, selectFilter], (types, filter) => {
    const allTypeIds = Object.keys(types);
    const newTypes = { ...types };

    for (let typeId of allTypeIds) {
      if (new Set(filter.types).has(typeId)) {
        newTypes[typeId].isChecked = true;
      } else {
        newTypes[typeId].isChecked = false;
      }
    }

    return newTypes;
  });

export const getAllLanguages = () =>
  createSelector([selectLanguages, selectFilter], (languages, filter) => {
    const allLanguageIds = Object.keys(languages);
    const newLanguages = { ...languages };

    for (let languageId of allLanguageIds) {
      if (new Set(filter.languages).has(languageId)) {
        newLanguages[languageId].isChecked = true;
      } else {
        newLanguages[languageId].isChecked = false;
      }
    }

    return newLanguages;
  });

export const getAllGenres = () =>
  createSelector([selectGenres, selectFilter], (genres, filter) => {
    const allGenreIds = Object.keys(genres);
    const newGenres = { ...genres };

    for (let genreId of allGenreIds) {
      if (new Set(filter.genres).has(genreId)) {
        newGenres[genreId].isChecked = true;
      } else {
        newGenres[genreId].isChecked = false;
      }
    }

    return newGenres;
  });

export const getFilters = () =>
  createSelector(selectFilter, filterState => filterState);

export const getAppliedFilters = () =>
  createSelector(
    selectAppliedFilters,
    appliedFilterState => appliedFilterState
  );
