// Core
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// Instruments
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const Button = ({ type, active, disabled, children, onClick }) => {
  const btnCls = cx({
    button: true,
    active,
    disabled,
  });

  return (
    <button
      className={btnCls}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  active: false,
  disabled: false,
  children: '',
  onClick: () => {},
};

export default Button;
