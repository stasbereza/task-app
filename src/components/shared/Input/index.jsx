// Core
import React from 'react';
import PropTypes from 'prop-types';
// Instruments
import styles from './styles.module.css';

const Input = ({ type, name, value, placeholder, onChange }) => (
  <input
    type={type}
    name={name}
    value={value}
    className={styles.input}
    placeholder={placeholder}
    onChange={onChange}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default Input;
