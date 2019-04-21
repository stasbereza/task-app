import { CHANGE_PAGE, UPDATE_TASKS_AMOUNT } from '../actions/types';

const initialState = {
  totalItems: null,
  currentPage: 1,
  pageSize: 3,
};

export default function pagerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_PAGE:
      return { ...state, currentPage: payload };

    case UPDATE_TASKS_AMOUNT:
      return { ...state, totalItems: payload };

    default:
      return state;
  }
}
