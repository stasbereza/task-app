// Core
import React from 'react';
import PropTypes from 'prop-types';
// Containers
import Container from '../ui/container';
// Instruments
import styles from './styles.module.css';

const AppBar = ({ children }) => (
  <header className={styles.header}>
    <Container
      styles={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {children}
    </Container>
  </header>
);

AppBar.propTypes = {
  children: PropTypes.node,
};

AppBar.defaultProps = {
  children: [],
};

export default AppBar;
