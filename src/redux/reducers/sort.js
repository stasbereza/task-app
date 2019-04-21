import { combineReducers } from 'redux';
import { CHANGE_SORT_FIELD, CHANGE_SORT_DIRECTION } from '../actions/types';

const initialState = {
  sortField: '',
  sortDirection: '',
};

function sortFieldReducer(state = '', { type, payload }) {
  switch (type) {
    case CHANGE_SORT_FIELD:
      return payload;

    default:
      return state;
  }
}

function sortDirectionReducer(state = '', { type, payload }) {
  switch (type) {
    case CHANGE_SORT_DIRECTION:
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  sortField: sortFieldReducer,
  sortDirection: sortDirectionReducer,
});
