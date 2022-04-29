import React, { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { MetricsMenu } from './UI/MetricsMenu';
import { Chart } from './UI/Chart';
import { getNewMeasurementSubscription } from './Core/graphql-query';
import { NewMeasureResponse } from './Core/model';
import { actions } from './Core/reducer';
import { SelectedMetricList } from './UI/SelectedMetricList';

export const Dashboard = () => {
  const { data } = useSubscription<NewMeasureResponse>(getNewMeasurementSubscription, {});
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.newMeasurement) {
      dispatch(actions.loadedNewestMeasurement(data.newMeasurement));
    }
  }, [data]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div>
        <MetricsMenu />
      </div>
      <SelectedMetricList />
      <Chart />
    </div>
  );
};
