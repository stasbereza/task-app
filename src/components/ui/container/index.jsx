// Core
import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ width = 1170, styles = {}, children }) => (
  <div
    style={{ maxWidth: width, margin: '0 auto', padding: '0 16px', ...styles }}>
    {children}
  </div>
);

Container.propTypes = {
  width: PropTypes.number,
  styles: PropTypes.shape({}),
  children: PropTypes.node,
};

Container.defaultProps = {
  width: 1170,
  styles: {},
  children: [],
};

export default Container;
