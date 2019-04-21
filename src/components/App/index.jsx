// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Modal from 'react-modal';
// Components
import AppBar from '../AppBar';
import AuthManager from '../AuthManager';
import SortManager from '../SortManager';
import TaskEditor from '../TaskEditor';
import TaskList from '../TaskList';
import TaskFilter from '../TaskFilter';
import Login from '../pages/Login';
import Loader from '../shared/Loader';
import Button from '../shared/Button';
import Container from '../ui/container';
// Instruments
import { fetchTasks } from '../../redux/actions/tasks';

Modal.setAppElement('#root');

const styles = {
  modal: {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
    content: {
      width: 600,
      height: 450,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
};

class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    page: PropTypes.number.isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    fetchTasks: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLoading: false,
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { page, sortField, sortDirection, fetchTasks } = this.props;

    fetchTasks({
      page,
      sortField,
      sortDirection,
    });
  }

  handleOpenModal = () => this.setState({ isModalOpen: true });

  handleCloseModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isModalOpen } = this.state;
    const { isLoading } = this.props;

    return (
      <Router>
        <AppBar>
          <Button onClick={this.handleOpenModal}>Create task</Button>
          <SortManager />
          <TaskFilter />
          <AuthManager />
        </AppBar>
        <Container>
          {isLoading ? (
            <Loader width={80} height={80} />
          ) : (
            <>
              <Route exact path="/" component={TaskList} />
              <Route path="/login" component={Login} />
            </>
          )}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={this.handleCloseModal}
            contentLabel="Modal Window"
            style={styles.modal}>
            <TaskEditor onCancel={this.handleCloseModal} />
          </Modal>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.tasks.loading,
  page: state.pager.currentPage,
  sortField: state.sort.sortField,
  sortDirection: state.sort.sortDirection,
});

export default connect(
  mapStateToProps,
  { fetchTasks },
)(App);
