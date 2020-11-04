export const getPlotFromApi = ({expression, min, max, width=600}) => {
  return fetch(`/getExpression?input=${expression} (x from ${min} to ${max})&width=${width}`)
    .then(res => res.json())
    .then(({pods, success}) => {
      const { subpods } = success && pods && pods.length
        ? pods.find(({title}) => title === 'Plot')
        : {};
      const { img } = subpods && subpods.length
        ? subpods[0]
        : {};
      return img && img.src
        ? img.src
        : null;
    });
}