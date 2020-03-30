import React from 'react';
import clsx from 'clsx';

import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

const ListFilters = props => {
  const {
    title,
    values,
    expanded,
    handleExpansion,
    handleOnCheckBoxClick,
  } = props;

  const classes = makeStyles(style)();

  return (
    <>
      <Grid className={classes.filterArea} item xs={12}>
        <ExpansionPanel square expanded={expanded}>
          <ExpansionPanelSummary
            className={clsx(expanded && classes.expansionPanelHeading)}
            expandIcon={<ExpandMoreIcon />}
            onClick={handleExpansion}
          >
            <Typography variant="h6">{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelBody}>
            <List className={classes.filterListArea}>
              {Object.values(values).map(value => (
                <ListItem
                  key={value._id}
                  role={undefined}
                  dense
                  button
                  onClick={handleOnCheckBoxClick(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.isChecked}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={value.name} />
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </>
  );
};

export default ListFilters;
