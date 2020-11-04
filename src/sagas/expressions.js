import { all, takeEvery, put } from 'redux-saga/effects';
import { getPlotFromApi } from './../utils/apiCalls';
import {
  GET_EXPRESSION,
  GET_EXPRESSION_SUCCESS,
  GET_EXPRESSION_FAIL,
} from './../actions/expressions';

export default function* expressions() {
  function* getExpression({expression, min, max, width}) {
    try {
      const url = yield getPlotFromApi({expression, min, max, width});
      yield put(url && url.length
        ? {
            type: GET_EXPRESSION_SUCCESS,
            url,
          }
        : {
            type: GET_EXPRESSION_FAIL,
            error: true,
          }
      );
    } catch {
      yield put({
        type: GET_EXPRESSION_FAIL,
        url: '',
      });
    }
  }

  yield all([
    takeEvery(GET_EXPRESSION, getExpression),
  ]);
}