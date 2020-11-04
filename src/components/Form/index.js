import React, { useState } from 'react';
import { isMathExpression, isNumber } from './../../utils/validators';
import './styles.css';


const Form = ({handler}) => {
  const [ fields, setFields ] = useState({
    mathExpression: '',
    min: -1,
    max: 1,
    fromApi: false,
  });
  const [ isNotValid, setIsNotValid ] = useState({});

  const handleFieldsChange = ({ target: { name, value, checked, type }}) => {
    const newFields = {
      ...fields,
      [name]: type === 'checkbox'
        ? checked
        : value,
    };
    setFields(newFields);

    const invalidFields = {
      mathExpression: !isMathExpression(newFields.mathExpression),
      min: !isNumber(newFields.min),
      max: !isNumber(newFields.max),
    };
    setIsNotValid(invalidFields)
    
    const isValid = Object.keys(invalidFields)
      .reduce((acc, key) => !invalidFields[key] && acc, true);

    isValid && handler(newFields);
  }

  return (
    <div className="form">
      <div className="container">
        <div className="input-wrapper">
          <input
            name="mathExpression"
            type="text"
            onChange={handleFieldsChange}
            value={fields.mathExpression}
            className={isNotValid.mathExpression ? 'invalid' : ''}
            placeholder="Math expression"
          />
        </div>
        <div className="input-wrapper">
          <input
            name="min"
            type="text"
            onChange={handleFieldsChange}
            value={fields.min}
            className={isNotValid.min ? 'invalid' : ''}
            placeholder="Min value for x"
          />
          <input
            name="max"
            type="text"
            onChange={handleFieldsChange}
            value={fields.max}
            className={isNotValid.max ? 'invalid' : ''}
            placeholder="Max value for x"
          />
        </div>
        <div className="input-wrapper">
          <label>Wolfram api</label>
          <input
            name="fromApi"
            type="checkbox"
            value={fields.fromApi}
            onChange={handleFieldsChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
