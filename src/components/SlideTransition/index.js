import React from 'react';

import Slide from '@material-ui/core/Slide';

const SlideTransition = React.forwardRef((props, ref) => {
  return (
    <>
      <Slide direction="up" ref={ref} {...props} />;
    </>
  );
});

export default SlideTransition;
