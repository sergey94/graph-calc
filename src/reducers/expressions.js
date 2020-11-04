import {
  GET_EXPRESSION,
  GET_EXPRESSION_SUCCESS,
  GET_EXPRESSION_FAIL,
} from './../actions/expressions';

export default function(
  state = {
    url: '',
    inProgress: false,
    error: false,
  }, {
    type,
    url = '',
  },
) {
  switch (type) {
    case GET_EXPRESSION:
      return {
        ...state,
        url: '',
        inProgress: true,
        error: false,
      };
    case GET_EXPRESSION_SUCCESS:
      return {
        ...state,
        url,
        inProgress: false,
        error: false,
      };
    case GET_EXPRESSION_FAIL:
      return {
        ...state,
        inProgress: false,
        error: true,
      };
    default:
      return state;
  }
}