import React from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import CameraRollRoundedIcon from '@material-ui/icons/CameraRollRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import MovieRoundedIcon from '@material-ui/icons/MovieRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import style from './style';
import { getCompleteUrl } from '../../utils/lib';

const MovieDescriptionCard = props => {
  const classes = makeStyles(style)();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const { name, url, language, type, genres } = props;

  const genreComponent =
    genres &&
    genres.map((genre, index) => (
      <Chip
        key={index}
        className={classes.genreTab}
        variant="outlined"
        color="primary"
        size="small"
        label={genre}
      />
    ));

  return (
    <>
      <Grid className={classes.descriptionArea}>
        <Grid className={classes.titleArea} container justify="space-between">
          <Typography className={classes.title}>{name}</Typography>
          {url && (
            <Button
              className={classes.watchButton}
              variant="contained"
              color="default"
              endIcon={!isMobileView && <OpenInNewRoundedIcon />}
              disableElevation
              onClick={() => window.open(getCompleteUrl(url), '_blank')}
            >
              {isMobileView ? <OpenInNewRoundedIcon /> : 'Watch'}
            </Button>
          )}
        </Grid>

        <Divider />

        <Grid className={classes.metadataArea} container>
          <Grid className={classes.tabArea} item xs={12} sm={3}>
            <Grid container alignItems="center">
              <Grid item>
                <LanguageRoundedIcon className={classes.languageIcon} />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.languageText}
                  variant="subtitle2"
                  display="inline"
                >
                  {language}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.tabArea} item xs={12} sm={3}>
            <Grid container alignItems="center">
              <Grid item>
                <CameraRollRoundedIcon className={classes.typeIcon} />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.typeText}
                  variant="subtitle2"
                  display="inline"
                >
                  {type}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.tabArea} item xs={12} sm>
            <Grid container alignItems="center">
              <Grid item>
                <MovieRoundedIcon className={classes.genreIcon} />
              </Grid>
              <Grid item>{genreComponent}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieDescriptionCard;
