// Core
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Components
import Button from '../shared/Button';
// Instruments
import { signOut } from '../../redux/actions/auth';

const styles = {
  list: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'block',
    padding: '8px',
    fontFamily: 'inherit',
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  activeLink: {
    color: 'palevioletred',
    border: '2px solid palevioletred',
    borderRadius: 4,
  },
};

const PublicActions = () => (
  <li>
    <NavLink to="/login" style={styles.link} activeStyle={styles.activeLink}>
      Log in
    </NavLink>
  </li>
);

const PrivateActions = ({ signOut }) => (
  <li>
    <Button
      onClick={async () => {
        await signOut();
      }}>
      Logout
    </Button>
  </li>
);

const AuthManager = ({ authenticated, ...props }) => (
  <ul style={styles.list}>
    {authenticated ? (
      <PrivateActions {...props} />
    ) : (
      <PublicActions {...props} />
    )}
  </ul>
);

PrivateActions.propTypes = {
  signOut: PropTypes.func.isRequired,
};

AuthManager.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { signOut };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthManager);
