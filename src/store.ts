import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Features/Chart/Core/sagas';
import { reducer as chart } from './Features/Chart/Core/reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { chart },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
