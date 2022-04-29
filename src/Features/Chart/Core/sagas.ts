import { PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { all, takeEvery, put } from 'redux-saga/effects';
import { client } from '../../../graphql-client';
import { getMultipleMeasurementsQuery } from './graphql-query';
import { actions } from './reducer';

function* loadMeasurements(action: PayloadAction<string>) {
  const metricName = action.payload;
  const request = {
    metricName,
    after: moment().subtract(30, 'minutes').unix(),
  };

  // @ts-ignore
  const res: any = yield client.query({
    query: getMultipleMeasurementsQuery, variables: { input: request },
  });

  yield put(actions.loadedMeasurements((res.data.getMultipleMeasurements[0])));
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.addMetric.type, loadMeasurements),
  ]);
}
