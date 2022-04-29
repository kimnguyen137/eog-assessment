import { gql } from '@apollo/client';

export const getMetrics = gql`
    query {
        getMetrics
    }
`;

export const getMultipleMeasurementsQuery = gql`
  query ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
      measurements {
        at
        metric
        unit
        value
      }
    }
  }
`;

export const getNewMeasurementSubscription = gql`
  subscription {
    newMeasurement {
        metric
        at
        value
        unit
      }
    }
`;
