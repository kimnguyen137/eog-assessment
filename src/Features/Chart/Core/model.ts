export interface MeasurementData {
  at: number;
  metric: string;
  unit: string;
  value: number;
}

export interface MultipleMeasurementsData {
  metric: string;
  measurements: MeasurementData[];
}

export interface GetMultipleMeasurementsReponse {
  getMultipleMeasurements: MultipleMeasurementsData[];
}

export interface MeasurementQuery {
  metricName: string;
  after: string;
  before: string;
}

export interface GetMetricsReponse {
  getMetrics: string[];
}

export interface NewMeasureResponse {
  newMeasurement: MeasurementData;
}
