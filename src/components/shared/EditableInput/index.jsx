// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from '../Button';
// Instruments
import styles from './styles.module.css';

export default class EditableInput extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onEditSuccess: PropTypes.func.isRequired,
    onEditAbort: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.text,
  };

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleEditSuccess = e => {
    e.preventDefault();

    this.props.onEditSuccess(this.state);
  };

  handleEditCancel = e => {
    e.preventDefault();

    this.props.onEditAbort();
  };

  render() {
    const { text } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleEditSuccess}>
        <textarea
          name={'text'}
          value={text}
          rows={8}
          className={styles.input}
          onChange={this.handleInputChange}
        />
        <div className={styles.actions}>
          <Button type="submit">Save</Button>
          <Button onClick={this.handleEditCancel} type="submit">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}
