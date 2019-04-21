// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import Checkbox from '../shared/Checkbox';
import EditableInput from '../shared/EditableInput';
import Button from '../shared/Button';
// Instruments
import { updateTaskText, updateTaskStatus } from '../../redux/actions/tasks';
import styles from './styles.module.css';

class Task extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    authenticated: PropTypes.bool.isRequired,
    onUpdateTaskText: PropTypes.func.isRequired,
    onUpdateTaskStatus: PropTypes.func.isRequired,
  };

  state = { isBeingEdited: false, checked: false };

  componentDidMount() {
    if (this.props.status === 10) {
      this.setState({
        checked: true,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsChanged =
      nextProps.text !== this.props.text ||
      nextProps.status !== this.props.status ||
      nextProps.authenticated !== this.props.authenticated;

    const stateChanged =
      this.state.isBeingEdited !== nextState.isBeingEdited ||
      this.state.checked !== nextState.checked;

    return propsChanged || stateChanged;
  }

  onEditStart = () => this.setState({ isBeingEdited: true });

  onEditEnd = () => this.setState({ isBeingEdited: false });

  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState({ checked }, () => {
      const status = this.state.checked ? 10 : 0;

      this.props.onUpdateTaskStatus({
        id: this.props.id,
        status,
      });
    });
  };

  handleUpdate = text => {
    this.props.onUpdateTaskText({ id: this.props.id, text });
    this.onEditEnd();
  };

  render() {
    const { id, username, email, text, authenticated } = this.props;
    const { checked, isBeingEdited } = this.state;

    return (
      <div className={styles.task}>
        <label htmlFor={id} style={{ marginBottom: 8 }}>
          <Checkbox
            id={id}
            checked={checked}
            disabled={!authenticated}
            onChange={this.handleCheckboxChange}
          />
          <span style={{ marginLeft: 8 }}>
            {checked ? 'Completed' : 'Uncompleted'}
          </span>
        </label>
        <p className={styles.text}>
          <span className={styles.title}>Username: </span>
          {username}
        </p>
        <p className={styles.text}>
          <span className={styles.title}>Email: </span>
          {email}
        </p>
        {isBeingEdited ? (
          <EditableInput
            text={text}
            onEditSuccess={this.handleUpdate}
            onEditAbort={this.onEditEnd}
          />
        ) : (
          <>
            <p className={styles.text}>
              <span className={styles.title}>Text: </span>
              {text}
            </p>
            <div className={styles.actions}>
              <Button disabled={!authenticated} onClick={this.onEditStart}>
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  onUpdateTaskText: taskToUpdate => dispatch(updateTaskText(taskToUpdate)),
  onUpdateTaskStatus: taskToUpdate => dispatch(updateTaskStatus(taskToUpdate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Task);
