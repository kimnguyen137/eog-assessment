import { Grid, Paper, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { getLatestMeasurements } from '../Core/selectors';

export const SelectedMetricList = () => {
  const lastestMeasurements = useSelector(getLatestMeasurements);
  if (isEmpty(lastestMeasurements)) return <div />;
  return (
    <Grid container spacing={2} style={{ padding: '10px' }}>
      {Object.keys(lastestMeasurements).map(metric => (
        <Grid item>
          <Paper elevation={3} style={{ padding: '10px' }}>
            <Typography>{metric}</Typography>
            <Typography variant="h3">{lastestMeasurements[metric].value}</Typography>
          </Paper>
        </Grid>

      ))}
    </Grid>

  );
};
