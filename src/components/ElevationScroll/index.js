import React from 'react';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const ElevationScroll = props => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    style: trigger
      ? { boxShadow: '0 5px 5px -5px #333' }
      : { boxShadow: 'none' },
  });
};

export default ElevationScroll;
