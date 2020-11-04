export const getBoundaries = (min, max) => {
  return min === max
    ? max === 0
        ? { start: -1, end: 1 }
        : max > 0
            ? { start: -min * 0.1, end: max * 1.1 }
            : { start: min * 1.1, end: -max * 0.1 }
    : max * min <= 0
        ? { start: min - ( max - min ) * 0.1, end: max + ( max - min ) * 0.1 }
        : max > 0
            ? { start: -( max - min ) * 0.1, end: max + ( max - min ) * 0.1 }
            : { start: min - ( max - min ) * 0.1, end: ( max - min ) * 0.1 };
}

export const getXCoord = (start = 0, end = 1, width = 1, value = 0) => {
  const scale = width / (end - start);
  return ( value - start ) * scale;
}

export const getYCoord = (start = 0, end = 1, height = 1, value = 0) => {
  const scale = height / (end - start);
  return -( value - start ) * scale + height;
}