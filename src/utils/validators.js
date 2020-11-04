const groupItem = '(x|[0-9]+)';
const beginingOp = '-';
const op = '[-+/*^]';
const group = `(${beginingOp}*${groupItem}(${op}${groupItem})*)`;
const openingP = `(${beginingOp}*\\()`;
const closingP = '\\)';
const groupWithP = `(${openingP}*${group}${closingP}*)`;
const groups = `${beginingOp}*${groupWithP}(${op}${groupWithP})*`;
const re = new RegExp(`^${groups}$`);

export const isMathExpression = (exp) => {
  const withoutSpaces = exp.replace(/\s/g, '');
  const isPatternValid = re.test(withoutSpaces);
  if(!isPatternValid) {
    return false;
  }

  let c = 0;
  for(let i = 0; i < withoutSpaces.length; i++) {
    if(withoutSpaces[i] === '(') {
      c++;
    }
    if(withoutSpaces[i] === ')') {
      c--;
    }
    if(c < 0) {
      return false;
    }
  }
  return c === 0;
}

export const isNumber = (value) => {
  return /^-?[0-9]+\.?[0-9]*$/.test(value.toString());
}