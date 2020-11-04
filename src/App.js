import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import Graph from './components/Graph';
import Form from './components/Form';
import { getExpression } from './actions/expressions';
import { WIDTH, HEIGHT } from './constants';
import './App.css';

function App({getExpressionFromApi, url, error, inProgress}) {
  const [ graphFields, setGraphFields ] = useState({});
  const [ showImagePlot, setShowImagePlot ] = useState(false);
  
  const { current: handleGraphFieldsChange } = useRef(
    debounce(({mathExpression, min, max, fromApi}) => {
      setShowImagePlot(fromApi);
      if(fromApi) {
        fromApi && getExpressionFromApi(mathExpression, min, max, WIDTH);
      } else {
        setGraphFields({
          mathExpression,
          min: parseFloat(min),
          max: parseFloat(max),
        });
      }
    }, 1000)
  );

  const showGraph = graphFields.mathExpression
    && ( graphFields.max || graphFields.max === 0 )
    && ( graphFields.min || graphFields.min === 0 );
  return (
    <div className="app">
      <div className="container">
        <Form handler={handleGraphFieldsChange} />
        { showImagePlot
          ? url
              ? <img
                  src={url}
                  style={{width: WIDTH}}
                  alt="plot"
                />
              : inProgress
                  ? 'Loading...'
                  : error
                      ? 'Error'
                      : null
          : showGraph
              ? <Graph
                  expression={graphFields.mathExpression}
                  min={graphFields.min}
                  max={graphFields.max}
                  width={WIDTH}
                  height={HEIGHT}
                />
              : null
        }
      </div>
    </div>
  );
}

const mapStateToProps = (({
  expressions: {
    url,
    error,
    inProgress,
  },
}) => ({
  url,
  error,
  inProgress,
}));

const mapDispatchToProps = dispatch => ({
  getExpressionFromApi: (expression, min, max, width) => dispatch(
    getExpression({expression, min, max, width})
  ),
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ConnectedApp;
