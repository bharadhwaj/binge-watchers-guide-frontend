import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';

import FilterArea from '../FilterArea';
import SlideTransition from '../SlideTransition';

const FilterAreaMobile = props => {
  const [openFilterArea, setFilterAreaState] = React.useState(false);

  const handleOpenFilterArea = () => {
    setFilterAreaState(true);
  };

  const handleCloseFilterArea = () => {
    setFilterAreaState(false);
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={8}>
          <Button
            color="primary"
            size="large"
            startIcon={<FilterListRoundedIcon />}
            onClick={handleOpenFilterArea}
            fullWidth
          >
            Filter List
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={openFilterArea}
        TransitionComponent={SlideTransition}
        fullScreen
        maxWidth="sm"
        keepMounted={false}
        onClose={handleCloseFilterArea}
      >
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFilterArea}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <FilterArea {...props} />
      </Dialog>
    </>
  );
};

export default FilterAreaMobile;
