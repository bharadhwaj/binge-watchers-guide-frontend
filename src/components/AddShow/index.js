import React from 'react';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

import { regex } from '../../constants';

const AddShow = props => {
  const {
    onAddShowSubmit,
    isAddShowSubmitLoading,
    types,
    languages,
    genres,
  } = props;

  const classes = makeStyles(style)();

  const [name, setNameValue] = React.useState('');

  const [url, setUrlValue] = React.useState('');
  const [urlError, setUrlError] = React.useState(false);

  const [typeId, setTypeValue] = React.useState('');

  const [languageId, setLanguageValue] = React.useState('');

  const [genreIds, setGenresValue] = React.useState([]);
  const [genreError, setGenreError] = React.useState(false);

  const getStyles = genreId => ({
    fontWeight: genreIds.indexOf(genreId) === -1 ? 500 : 700,
  });

  const handleNameTyping = event => {
    setNameValue(event.target.value);
  };

  const handleUrlTyping = event => {
    setUrlValue(event.target.value);
  };

  const checkUrlValue = event => {
    if (
      regex.URL.test(event.target.value.trim()) ||
      event.target.value.trim() === ''
    ) {
      setUrlError(false);
    } else {
      setUrlError(true);
    }
    setUrlValue(event.target.value.trim());
  };

  const handleTypeSelect = event => {
    setTypeValue(event.target.value);
  };

  const handleLanguageSelect = event => {
    setLanguageValue(event.target.value);
  };

  const handleGenresSelect = event => {
    if (event.target.value.length > 3) {
      setGenreError(true);
    } else {
      setGenreError(false);
    }
    setGenresValue(event.target.value);
  };

  const handleAddShowSubmit = event => {
    event.preventDefault();
    onAddShowSubmit({
      name,
      url,
      type: typeId,
      language: languageId,
      genres: genreIds,
    });
  };

  return (
    <>
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid item xs={12} sm={10}>
          <Grid container justify="center" className={classes.addShowElement}>
            <Typography variant="h4">Add Show</Typography>
          </Grid>
          <form onSubmit={handleAddShowSubmit}>
            <Grid container justify="center" className={classes.addShowElement}>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="name"
                  variant="outlined"
                  label="Name"
                  placeholder="The Shawshank Redemption"
                  value={name}
                  onChange={handleNameTyping}
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container justify="center" className={classes.addShowElement}>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="url"
                  variant="outlined"
                  label="URL (Optional)"
                  placeholder=""
                  value={url}
                  onChange={handleUrlTyping}
                  onBlur={checkUrlValue}
                  error={urlError}
                  helperText={urlError && 'Invalid URL format.'}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container justify="center" className={classes.addShowElement}>
              <Grid item xs={12} sm={10}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="select-type-label">Type</InputLabel>
                  <Select
                    labelId="select-type-label"
                    id="select-type"
                    value={typeId}
                    onChange={handleTypeSelect}
                    labelWidth={35}
                    fullWidth
                  >
                    {Object.values(types).map(type => (
                      <MenuItem key={type._id} value={type._id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container justify="center" className={classes.addShowElement}>
              <Grid item xs={12} sm={10}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="select-language-label">Language</InputLabel>
                  <Select
                    labelId="select-language-label"
                    id="select-language"
                    value={languageId}
                    onChange={handleLanguageSelect}
                    labelWidth={67}
                    fullWidth
                  >
                    {Object.values(languages).map(language => (
                      <MenuItem key={language._id} value={language._id}>
                        {language.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container justify="center" className={classes.addShowElement}>
              <Grid item xs={12} sm={10}>
                <FormControl variant="outlined" fullWidth error={genreError}>
                  <div
                    className={clsx(
                      genreError
                        ? classes.multipleSelectError
                        : classes.multipleSelect
                    )}
                  >
                    <InputLabel
                      className={classes.multipleSelectLabel}
                      id="select-genres-chip-label"
                    >
                      Genre (Max 3)
                    </InputLabel>
                    <Select
                      labelId="select-genres-chip-label"
                      id="genres-chip"
                      value={genreIds}
                      onChange={handleGenresSelect}
                      labelWidth={67}
                      input={<Input id="select-genres-chip" />}
                      renderValue={selected => (
                        <Grid className={classes.chips}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              variant="outlined"
                              label={genres[value].name}
                              className={classes.chip}
                            />
                          ))}
                        </Grid>
                      )}
                      multiple
                      fullWidth
                    >
                      {Object.values(genres).map(genre => (
                        <MenuItem
                          key={genre._id}
                          value={genre._id}
                          style={getStyles(genre._id)}
                        >
                          {genre.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  {genreError && (
                    <FormHelperText>
                      Can't add more than 3 genre.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid container justify="center" className={classes.lastElement}>
              <Grid item xs={12} sm={10}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  disabled={urlError || name === ''}
                  onClick={handleAddShowSubmit}
                  fullWidth
                >
                  {!isAddShowSubmitLoading ? 'Add' : <CircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddShow;
