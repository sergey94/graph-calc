const PointAndText = ({x, y, text}) => {
  return (
    <>
      <polygon
        points={`${x-2},${y} ${x},${y+2} ${x+2},${y} ${x},${y-2}`}
        style={{fill:'#3f3f3f', strokeWidth:1}}
      />
      <text
        x={x + 3}
        y={y + 10}
        style={{fill: '#3f3f3f', fontSize: 8, lineHeight: 10}}
      >
        { text }
      </text>
    </>
  )
}

export default PointAndText;