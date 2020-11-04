const Line = ({color = 'gray', points = []}) => {
  const getLinePaths = (pts) => {
    const paths = [];
    let currentPath = [];
    pts.forEach(({x, y}) => {
      if(isNaN(y)) {
        if(currentPath.length && currentPath.length > 1) {
          paths.push(currentPath.join(' '));
          currentPath = [];
        }
      } else {
        const prefix = currentPath.length ? 'L' : 'M';
        currentPath.push(`${prefix}${x} ${y}`);
      }
    });
    paths.push(currentPath.join(' '));
    return paths;
  };

  const paths = getLinePaths(points);

  return (
    <g stroke={color} fill="transparent">
      { paths && paths.length && paths.map((path, index) => (
        <path d={path} key={index} />
      ))}
    </g>
  )
}

export default Line;