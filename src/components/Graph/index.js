import React from 'react';
import PointAndText from './../svg/PointAndText';
import Line from './../svg/Line';
import { getExpressionByXPoints, getXPoints } from './../../utils';
import {
  getXCoord,
  getYCoord,
  getBoundaries,
} from './../../utils/coordsParsers';


const Graph = ({
  expression,
  min = 0,
  max = 0,
  width = 600,
  height = 400,
}) => {
  const xPoints = getXPoints(parseFloat(min), parseFloat(max), width / 10);
  const { points, yMax, yMin } = getExpressionByXPoints(expression, xPoints);

  const { start: xStart, end: xEnd } = getBoundaries(min, max);
  const { start: yStart, end: yEnd } = getBoundaries(yMin, yMax);

  const getPointCoords = ({x, y}) => ({
    x: getXCoord(xStart, xEnd, width, x),
    y: getYCoord(yStart, yEnd, height, y),
  });

  const xAxisPoints = [{ x: 0, y: yStart }, { x: 0, y: yEnd }];
  const yAxisPoints = [{ x: xStart, y: 0 }, { x: xEnd, y: 0 }];

  return (
    <div className="graph">
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <rect width="100%" height="100%" fill="#f0f0f0" /> 
        <Line color="gray" points={xAxisPoints.map(p => getPointCoords(p))} />
        <Line color="gray" points={yAxisPoints.map(p => getPointCoords(p))} />
        <Line color="red" points={points.map(p => getPointCoords(p))} />
        <PointAndText
          text={max}
          x={getXCoord(xStart, xEnd, width, max)}
          y={getYCoord(yStart, yEnd, height)}
        />
        <PointAndText
          text={min}
          x={getXCoord(xStart, xEnd, width, min)}
          y={getYCoord(yStart, yEnd, height)}
        />
        <PointAndText
          text={yMax}
          x={getXCoord(xStart, xEnd, width)}
          y={getYCoord(yStart, yEnd, height, yMax)}
        />
        <PointAndText
          text={yMin}
          x={getXCoord(xStart, xEnd, width)}
          y={getYCoord(yStart, yEnd, height, yMin)}
        />
      </svg>
    </div>
  );
}

export default Graph;
