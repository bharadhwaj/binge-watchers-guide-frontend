import React from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import ListFilters from '../ListFilters';

import style from './style';

import { utils } from '../../constants';

const FilterArea = props => {
  const classes = makeStyles(style)();

  const [allFilterValues, setFilterValues] = React.useState([]);

  const [types, setTypes] = React.useState({});
  const [languages, setLanguages] = React.useState({});
  const [genres, setGenres] = React.useState({});

  React.useEffect(() => {
    setTypes(props.types);
    setLanguages(props.languages);
    setGenres(props.genres);
  }, [props.types, props.languages, props.genres]);

  const [typeExpanded, setTypeExpansion] = React.useState(true);
  const [languageExpanded, setLanguageExpansion] = React.useState(false);
  const [genreExpanded, setGenreExpansion] = React.useState(false);

  const handleExpansion = type => {
    if (type === utils.FILTER_TYPES.TYPE) {
      setTypeExpansion(!typeExpanded);
    } else if (type === utils.FILTER_TYPES.LANGUAGE) {
      setLanguageExpansion(!languageExpanded);
    } else if (type === utils.FILTER_TYPES.GENRE) {
      setGenreExpansion(!genreExpanded);
    }
  };

  const handleOnCheckBoxClick = currentValue => () => {
    if (!currentValue.isChecked) {
      setFilterValues([
        ...allFilterValues,
        { ...currentValue, isChecked: true },
      ]);
    } else {
      const newFilterValues = [...allFilterValues].filter(
        value =>
          value._id !== currentValue._id || value.type !== currentValue.type
      );
      setFilterValues(newFilterValues);
    }

    if (currentValue.type === utils.FILTER_TYPES.TYPE) {
      const newTypes = { ...types };
      delete newTypes[currentValue._id];
      setTypes(newTypes);
    } else if (currentValue.type === utils.FILTER_TYPES.LANGUAGE) {
      const newLanguages = { ...languages };
      delete newLanguages[currentValue._id];
      setLanguages(newLanguages);
    } else if (currentValue.type === utils.FILTER_TYPES.GENRE) {
      const newGenres = { ...genres };
      delete newGenres[currentValue._id];
      setGenres(newGenres);
    }
  };

  const handleOnDeleteValue = currentValue => () => {
    const newFilterValues = [...allFilterValues].filter(
      value =>
        value._id !== currentValue._id || value.type !== currentValue.type
    );
    setFilterValues(newFilterValues);

    if (currentValue.type === utils.FILTER_TYPES.TYPE) {
      const newTypes = {
        ...types,
        [currentValue._id]: { ...currentValue, isChecked: false },
      };
      setTypes(newTypes);
    } else if (currentValue.type === utils.FILTER_TYPES.LANGUAGE) {
      const newLanguages = {
        ...languages,
        [currentValue._id]: { ...currentValue, isChecked: false },
      };
      setLanguages(newLanguages);
    } else if (currentValue.type === utils.FILTER_TYPES.GENRE) {
      const newGenres = {
        ...genres,
        [currentValue._id]: { ...currentValue, isChecked: false },
      };
      setGenres(newGenres);
    }
  };

  const handleResetFilter = () => {
    setFilterValues([]);
    setTypes(props.types || {});
    setLanguages(props.languages || {});
    setGenres(props.genres || {});
  };

  const applyFilter = () => {
    const { getAllShows, userId } = props;

    const typesList = [];
    const languagesList = [];
    const genresList = [];

    for (let value of allFilterValues) {
      if (value.type === utils.FILTER_TYPES.TYPE) {
        typesList.push(value._id);
      } else if (value.type === utils.FILTER_TYPES.LANGUAGE) {
        languagesList.push(value._id);
      } else if (value.type === utils.FILTER_TYPES.GENRE) {
        genresList.push(value._id);
      }
    }

    console.log('ON SUBMIT: ', typesList, languagesList, genresList, userId);

    getAllShows({
      userId,
      types: typesList,
      languages: languagesList,
      genres: genresList,
    });
  };

  const filterChipComponent = allFilterValues.map(value => (
    <Chip
      className={classes.chips}
      key={value._id + ' ' + value.type}
      color="primary"
      label={value.name}
      onDelete={handleOnDeleteValue(value)}
    />
  ));

  return (
    <>
      <Grid className={classes.filterArea}>
        <Grid container justify="space-between">
          <Grid item xs>
            <Typography variant="h6">Filters</Typography>
          </Grid>

          {allFilterValues && allFilterValues.length > 0 && (
            <Grid item xs={4}>
              <Button
                color="primary"
                fullWidth
                disabled={allFilterValues && allFilterValues.length < 1}
                onClick={handleResetFilter}
              >
                Clear All
              </Button>
            </Grid>
          )}
        </Grid>

        <Paper className={classes.filterChipsArea} elevation={0}>
          {filterChipComponent}
        </Paper>

        {allFilterValues && allFilterValues.length > 0 && (
          <>
            <Hidden smDown>
              <Grid item md={5}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  disabled={allFilterValues && allFilterValues.length < 1}
                  onClick={applyFilter}
                >
                  Apply
                </Button>
              </Grid>
            </Hidden>

            <Hidden mdUp>
              <Grid container justify="center">
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    disabled={allFilterValues && allFilterValues.length < 1}
                    onClick={applyFilter}
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Hidden>
          </>
        )}

        <Divider className={classes.divider} />

        <ListFilters
          title="Types"
          values={types}
          expanded={typeExpanded}
          handleExpansion={() => handleExpansion(utils.FILTER_TYPES.TYPE)}
          handleOnCheckBoxClick={handleOnCheckBoxClick}
        />

        <ListFilters
          title="Languages"
          values={languages}
          expanded={languageExpanded}
          handleExpansion={() => handleExpansion(utils.FILTER_TYPES.LANGUAGE)}
          handleOnCheckBoxClick={handleOnCheckBoxClick}
        />

        <ListFilters
          title="Genres"
          values={genres}
          expanded={genreExpanded}
          handleExpansion={() => handleExpansion(utils.FILTER_TYPES.GENRE)}
          handleOnCheckBoxClick={handleOnCheckBoxClick}
        />
      </Grid>
    </>
  );
};

export default FilterArea;
