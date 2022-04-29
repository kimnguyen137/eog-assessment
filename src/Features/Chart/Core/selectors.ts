import { createSelector } from '@reduxjs/toolkit';
import { last } from 'lodash';
import { MeasurementData } from './model';
import { ChartState } from './reducer';

interface AppState {
  chart: ChartState;
}
export const getMetricNames = (state: AppState) => state.chart.metrics;

export const getSelectedMetrics = (state: AppState) => state.chart.selectedMetrics;

export const getMeasurements = (state: AppState) => state.chart.measurements;

export const getLatestMeasurements = createSelector(getSelectedMetrics, getMeasurements,
  (selectedMetrics, measurements) => {
    const result: Record<string, MeasurementData> = {};
    selectedMetrics.forEach(metric => {
      result[metric] = last(measurements[metric]) as MeasurementData;
    });

    return result;
  });
