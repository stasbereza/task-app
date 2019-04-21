// Core
import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
// Components
import Task from '../Task';
import InlineMessage from '../shared/InlineMessage';
import Pager from '../shared/Pager';
// Instruments
import { getVisibleTasks } from '../../utils/selectors';
import styles from './styles.module.css';

const TaskList = ({ tasks, ...props }) =>
  tasks.length > 0 ? (
    <>
      <Masonry className={styles.list} elementType={'ul'}>
        {tasks.map(task => (
          <li key={task.id} className={styles.item}>
            <Task {...task} {...props} />
          </li>
        ))}
      </Masonry>
      <Pager />
    </>
  ) : (
    <InlineMessage text="There are no tasks yet. Please, add a new one." />
  );

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  tasks: getVisibleTasks(state.tasks.data, state.filter),
});

export default connect(
  mapStateToProps,
  null,
)(TaskList);
