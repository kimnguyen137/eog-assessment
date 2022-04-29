import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import {
  InputLabel, OutlinedInput, ListItemText, MenuItem, Select, Checkbox, FormControl,
} from '@material-ui/core';
import { getMetrics } from '../Core/graphql-query';
import { GetMetricsReponse } from '../Core/model';
import { actions } from '../Core/reducer';
import { getSelectedMetrics, getMetricNames } from '../Core/selectors';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 100;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 1000,
    },
  },
};

export const MetricsMenu = () => {
  const { data } = useQuery<GetMetricsReponse>(getMetrics);
  const dispatch = useDispatch();
  const metrics = useSelector(getMetricNames);
  const selectedMetrics = useSelector(getSelectedMetrics);

  useEffect(() => {
    if (data && data.getMetrics) {
      dispatch(actions.loadedMetricNames(data.getMetrics));
    }
  }, [data]);

  const onCheckBoxClicked = (metric:string) => {
    const isUncheckedAction = selectedMetrics.includes(metric);
    if (isUncheckedAction) {
      dispatch(actions.removeMetric(metric));
    } else {
      dispatch(actions.addMetric(metric));
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <FormControl style={{ width: '300px' }}>
        <InputLabel style={{ padding: '0 10px' }}>Select Metrics</InputLabel>
        <Select
          multiple
          value={selectedMetrics}
          input={<OutlinedInput label="Tag" />}
          renderValue={(keys: any) => keys.join(', ')}
          MenuProps={MenuProps}

        >
          {metrics.map((metric) => (
            <MenuItem key={metric} value={metric} onClick={() => onCheckBoxClicked(metric)}>
              <Checkbox
                checked={selectedMetrics.includes(metric)}
              />
              <ListItemText primary={metric} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
};
