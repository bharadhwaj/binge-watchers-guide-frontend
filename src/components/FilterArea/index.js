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

  const [types, setTypes] = React.useState(props.types || []);
  const [languages, setLanguages] = React.useState(props.languages || []);
  const [genres, setGenres] = React.useState(props.genres || []);

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
      const newTypes = [...types].map(type =>
        type._id === currentValue._id
          ? { ...type, isChecked: !type.isChecked }
          : type
      );
      setTypes(newTypes);
    } else if (currentValue.type === utils.FILTER_TYPES.LANGUAGE) {
      const newLanguages = [...languages].map(language =>
        language._id === currentValue._id
          ? { ...language, isChecked: !language.isChecked }
          : language
      );
      setLanguages(newLanguages);
    } else if (currentValue.type === utils.FILTER_TYPES.GENRE) {
      const newGenres = [...genres].map(genre =>
        genre._id === currentValue._id
          ? { ...genre, isChecked: !genre.isChecked }
          : genre
      );
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
      const newTypes = [...types].map(type =>
        type._id === currentValue._id ? { ...type, isChecked: false } : type
      );
      setTypes(newTypes);
    } else if (currentValue.type === utils.FILTER_TYPES.LANGUAGE) {
      const newLanguages = [...languages].map(language =>
        language._id === currentValue._id
          ? { ...language, isChecked: false }
          : language
      );
      setLanguages(newLanguages);
    } else if (currentValue.type === utils.FILTER_TYPES.GENRE) {
      const newGenres = [...genres].map(genre =>
        genre._id === currentValue._id ? { ...genre, isChecked: false } : genre
      );
      setGenres(newGenres);
    }
  };

  const handleResetFilter = () => {
    setFilterValues([]);
    setTypes(props.types || []);
    setLanguages(props.languages || []);
    setGenres(props.genres || []);
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
