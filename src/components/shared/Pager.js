// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import PagerButton from '../shared/PagerButton';
// Instruments
import { fetchTasksOnChangePage } from '../../redux/actions/tasks';

const styles = {
  list: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 0,
    listStyle: 'none',
  },
};

class Pager extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})),
    totalItems: PropTypes.number,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    onChangePage: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    totalItems: null,
    initialPage: 1,
    pageSize: 3,
    sortField: '',
    sortDirection: '',
    onChangePage: () => null,
  };

  state = { pager: {} };

  componentDidMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if initialPage has changed
    if (
      this.props.initialPage !== prevProps.initialPage ||
      this.props.totalItems !== prevProps.totalItems
    ) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage = page => {
    const { totalItems, pageSize, sortField, sortDirection } = this.props;
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let pager = this.state.pager;

    if (page < 1 || page > totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(totalItems, page, pageSize);

    // update state
    this.setState({ pager });

    // call change page function
    this.props.onChangePage(page, sortField, sortDirection);
  };

  getPager = (totalItems, currentPage, pageSize) => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      // eslint-disable-next-line no-lonely-if
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i,
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  };

  render() {
    const { pager } = this.state;
    // doesn't display pager if there is only 1 page
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <ul style={styles.list}>
        <li>
          <PagerButton
            disabled={pager.currentPage === 1}
            onClick={() => this.setPage(1)}>
            First
          </PagerButton>
        </li>
        <li>
          <PagerButton
            disabled={pager.currentPage === 1}
            onClick={() => this.setPage(pager.currentPage - 1)}>
            Previous
          </PagerButton>
        </li>
        {pager.pages.map(page => (
          <li key={page}>
            <PagerButton
              active={pager.currentPage === page}
              onClick={() => this.setPage(page)}>
              {page}
            </PagerButton>
          </li>
        ))}
        <li>
          <PagerButton
            disabled={pager.currentPage === pager.totalPages}
            onClick={() => this.setPage(pager.currentPage + 1)}>
            Next
          </PagerButton>
        </li>
        <li>
          <PagerButton
            disabled={pager.currentPage === pager.totalPages}
            onClick={() => this.setPage(pager.totalPages)}>
            Last
          </PagerButton>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  items: state.tasks.data,
  totalItems: state.pager.totalItems,
  initialPage: state.pager.currentPage,
  pageSize: state.pager.pageSize,
  sortField: state.sort.sortField,
  sortDirection: state.sort.sortDirection,
});

const mapDispatchToProps = dispatch => ({
  onChangePage: (page, sortField, sortDirection) =>
    dispatch(fetchTasksOnChangePage(page, sortField, sortDirection)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pager);
