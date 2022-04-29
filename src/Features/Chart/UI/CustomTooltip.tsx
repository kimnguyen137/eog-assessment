import React from 'react';
import { Box } from '@material-ui/core';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { getSelectedMetrics } from '../Core/selectors';

export const CustomTooltip = ({ active, payload }: any) => {
  const selectedMetrics = useSelector(getSelectedMetrics);

  if (!active || isEmpty(payload)) return null;

  return (
    <Box boxShadow={5}>
      <div className="custom-tooltip" style={{ padding: '20px' }}>
        <p className="currentTime">Date: {moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
        {selectedMetrics.map(metric => (
          <p className="selectedCurrentMeasuremnt">{`${metric} : ${payload[0].value}`}</p>
        ))}
      </div>
    </Box>

  );
};
