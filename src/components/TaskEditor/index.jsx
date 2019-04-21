// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import Button from '../shared/Button';
// Instruments
import { addTask } from '../../redux/actions/tasks';
import styles from './styles.module.css';

const INITIAL_STATE = {
  username: '',
  email: '',
  text: '',
};

class TaskEditor extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = { ...INITIAL_STATE };

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, text } = this.state;

    if (username === '' || email === '' || text === '') {
      return;
    }
    const newTask = this.state;

    this.props.onAddTask(newTask);
    this.props.onCancel();
    this.resetState();
  };

  resetState = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { username, email, text } = this.state;
    const { onCancel } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <input
          name="username"
          value={username}
          className={styles.input}
          placeholder="User name"
          onChange={this.handleInputChange}
        />
        <input
          name="email"
          value={email}
          className={styles.input}
          placeholder="Email"
          onChange={this.handleInputChange}
        />
        <textarea
          name="text"
          value={text}
          rows="8"
          className={styles.input}
          placeholder="Type task text..."
          onChange={this.handleInputChange}
        />
        <div className={styles.actions}>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddTask: task => dispatch(addTask(task)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TaskEditor);
