import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';

import FilterArea from '../FilterArea';
import SortArea from '../SortArea';

import style from './style';

const FilterAreaWeb = props => {
  const classes = makeStyles(style)();

  return (
    <>
      <Card className={classes.filterArea}>
        <CardContent>
          <SortArea {...props} />
          <FilterArea {...props} />
        </CardContent>
      </Card>
    </>
  );
};

export default FilterAreaWeb;
