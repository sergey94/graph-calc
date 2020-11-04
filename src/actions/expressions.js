export const GET_EXPRESSION = 'GET_EXPRESSION';
export const GET_EXPRESSION_SUCCESS = 'GET_EXPRESSION_SUCCESS';
export const GET_EXPRESSION_FAIL = 'GET_EXPRESSION_FAIL';

export const getExpression = ({expression, min, max, width}) => {
  return {
    type: GET_EXPRESSION,
    expression,
    min,
    max,
    width,
  };
}