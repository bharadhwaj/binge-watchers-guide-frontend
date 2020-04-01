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
  const { types, languages, genres, appliedFilters } = props;

  const classes = makeStyles(style)();

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
    const { addFilter, removeFilter } = props;

    if (currentValue.type === utils.FILTER_TYPES.TYPE) {
      if (!currentValue.isChecked) {
        addFilter({ type: currentValue._id });
      } else {
        removeFilter({ type: currentValue._id });
      }
    } else if (currentValue.type === utils.FILTER_TYPES.LANGUAGE) {
      if (!currentValue.isChecked) {
        addFilter({ language: currentValue._id });
      } else {
        removeFilter({ language: currentValue._id });
      }
    } else if (currentValue.type === utils.FILTER_TYPES.GENRE) {
      if (!currentValue.isChecked) {
        addFilter({ genre: currentValue._id });
      } else {
        removeFilter({ genre: currentValue._id });
      }
    }
  };

  const handleOnDeleteValue = currentValue => () => {
    const { removeFilter } = props;

    if (currentValue.type === utils.FILTER_TYPES.TYPE) {
      removeFilter({ type: currentValue._id });
    } else if (currentValue.type === utils.FILTER_TYPES.LANGUAGE) {
      removeFilter({ language: currentValue._id });
    } else if (currentValue.type === utils.FILTER_TYPES.GENRE) {
      removeFilter({ genre: currentValue._id });
    }
  };

  const handleResetFilter = () => {
    const { resetFilter } = props;
    resetFilter();
  };

  const applyFilter = () => {
    const { getAllShows, handleCloseFilterArea } = props;
    getAllShows();
    handleCloseFilterArea && handleCloseFilterArea();
  };

  const filterChipComponent =
    appliedFilters &&
    appliedFilters.length > 0 &&
    appliedFilters.map(value => (
      <Chip
        className={classes.chips}
        key={value._id + ' ' + value.type}
        variant="outlined"
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

          {appliedFilters && appliedFilters.length > 0 && (
            <Grid item xs={4}>
              <Button
                color="primary"
                fullWidth
                disabled={appliedFilters && appliedFilters.length < 1}
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

        {appliedFilters && appliedFilters.length > 0 && (
          <>
            <Hidden smDown>
              <Grid item md={5}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={appliedFilters && appliedFilters.length < 1}
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
                    color="primary"
                    variant="contained"
                    fullWidth
                    disabled={appliedFilters && appliedFilters.length < 1}
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
