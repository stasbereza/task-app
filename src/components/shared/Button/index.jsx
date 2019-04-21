// Core
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// Instruments
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const Button = ({
  type,
  active,
  disabled,
  children,
  isOrangeBgColor,
  onClick,
}) => {
  const btnCls = cx({
    button: true,
    isOrangeBgColor,
    active,
    disabled,
  });

  return (
    <button
      type={type}
      disabled={disabled}
      className={btnCls}
      onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  isOrangeBgColor: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.shape({}),
  ]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  active: false,
  disabled: false,
  isOrangeBgColor: false,
  children: '',
  onClick: () => {},
};

export default Button;
