// Core
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import Input from '../shared/Input';
// Instruments
import { changeFilter } from '../../redux/actions/tasks';
import styles from './styles.module.css';

const TaskFilter = ({ filter, onFilterChange }) => (
  <form className={styles.form}>
    <Input
      name="text"
      value={filter}
      placeholder="Filter by username and email..."
      onChange={({ target: { value } }) => onFilterChange(value)}
    />
  </form>
);

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(changeFilter(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskFilter);
