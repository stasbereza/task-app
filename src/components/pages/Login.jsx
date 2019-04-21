// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import Input from '../shared/Input';
import Button from '../shared/Button';
// Instruments
import { signIn } from '../../redux/actions/auth';

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const INITIAL_STATE = { login: '', password: '' };

class LoginPage extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({}),
    signIn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    history: {},
  };

  state = { ...INITIAL_STATE };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  checkAuthentication = () => {
    const { authenticated, history } = this.props;

    if (authenticated) {
      history.push('/');
    }
  };

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { login, password } = this.state;

    if (login === '' || password === '') return;

    this.props.signIn({ ...this.state });
    this.resetState();
  };

  resetState = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { login, password } = this.state;
    const { history } = this.props;

    return (
      <div style={styles.page}>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <div style={styles.inputGroup}>
            <Input
              type="text"
              name="login"
              value={login}
              placeholder="Login"
              onChange={this.handleInputChange}
            />
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <Button type="submit">Login</Button>
            <Button onClick={() => history.push('/')}>Back</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { signIn };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
