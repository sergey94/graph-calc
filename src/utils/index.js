import { isNumber } from './validators';

const parseSubExp = (expression) => {
  if(isNumber(expression)) {
    return parseFloat(expression);
  }

  const indexOfDoubleMinus = expression.indexOf('--');
  if(indexOfDoubleMinus >= 0) {
    return indexOfDoubleMinus
      ? parseSubExp(expression.replace('--', '+'))
      : parseSubExp(expression.replace('--', ''));
  }
  const indexOfA = expression.lastIndexOf('+');
  if(indexOfA >= 0) {
    return parseSubExp(expression.slice(0, indexOfA)) + parseSubExp(expression.slice(indexOfA + 1));
  }
  const indexOfS = expression.lastIndexOf('-');
  if(indexOfS > 0 && '/*^'.indexOf(expression[indexOfS - 1]) === -1) {
    return parseSubExp(expression.slice(0, indexOfS)) - parseSubExp(expression.slice(indexOfS + 1));
  }
  const indexOfM = expression.lastIndexOf('*');
  if(indexOfM >= 0) {
    return parseSubExp(expression.slice(0, indexOfM)) * parseSubExp(expression.slice(indexOfM + 1));
  }
  const indexOfP = expression.indexOf('^');
  if(indexOfP >= 0) {
    return Math.pow(parseSubExp(expression.slice(0, indexOfP)), parseSubExp(expression.slice(indexOfP + 1)));
  }
  const indexOfD = expression.lastIndexOf('/');
  if(indexOfD >= 0) {
    const f = parseSubExp(expression.slice(0, indexOfD));
    const s = parseSubExp(expression.slice(indexOfD + 1));
    return f
      ? f / s
      : NaN;
  }

  return NaN;
}

const parseExp = (expression) => {
  const expComps = expression.match(/(\([^()]*\))/g);

  if(expComps && expComps.length) {
    let subExp = expression;
    expComps.forEach((expComp) => {
      subExp = subExp.replace(expComp, parseSubExp(expComp.replace(/[()]/g, '')));
    });
    return parseExp(subExp);
  }
  return parseSubExp(expression);
}

export const getXPoints = (min, max, sectionsAmounth) => {
  if(min === max) {
    return [min];
  }
  const xPoints = [];
  const delta = ( max - min ) / sectionsAmounth;
  for(let i = 0; i < sectionsAmounth + 1; i++) {
    xPoints.push(min + i * delta);
  }

  return xPoints;
}

export const getExpressionByXPoints = (exp = '', xPoints) => {
  const data = {};
  try {
    let maxVal, minVal;
    data.points = xPoints.map((x) => {
      const finalExp = exp.replace(/\s/g, '').replace(/x/g, x);
      const y = parseExp(finalExp);
      if((!maxVal && maxVal !== 0) || maxVal < y) {
        maxVal = y;
      }
      if((!minVal && minVal !== 0) || minVal > y) {
        minVal = y;
      }
      return { x, y };
    });
    data.yMax = maxVal;
    data.yMin = minVal;
    return data;
  } catch (err) {
    return {};
  }
}