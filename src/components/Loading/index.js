import React from 'react';

import PacmanLoader from 'react-spinners/PacmanLoader';

import Grid from '@material-ui/core/Grid';

const Loading = ({ loading }) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <PacmanLoader color="#FFDF46" size={50} loading={loading} />
    </Grid>
  );
};

export default Loading;
