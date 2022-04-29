import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeasurementData } from './model';

export interface ChartState {
  metrics: string[];
  selectedMetrics: string[];
  measurements: Record<string, MeasurementData[]>;
}

const initialState: ChartState = {
  metrics: [],
  selectedMetrics: [],
  measurements: {},
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    addMetric(state, action:PayloadAction<string>) {
      const metric = action.payload;
      state.selectedMetrics.push(metric);
    },
    removeMetric(state, action:PayloadAction<string>) {
      const metric = action.payload;
      state.selectedMetrics = state.selectedMetrics.filter(m => m !== metric);
    },
    loadedMeasurements(
      state, action: PayloadAction<{ metric:string, measurements: MeasurementData[] }>,
    ) {
      const { metric, measurements } = action.payload;
      state.measurements[metric] = measurements;
    },
    loadedNewestMeasurement(state, action: PayloadAction<MeasurementData>) {
      const { metric } = action.payload;

      if (!state.measurements[metric]) {
        state.measurements[metric] = [];
      }

      state.measurements[metric].push(action.payload);
    },
    loadedMetricNames(state, action: PayloadAction<string[]>) {
      const metrics = action.payload;
      state.metrics = metrics;
    },
  },
});

export const { actions, reducer } = chartSlice;
