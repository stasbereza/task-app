import { combineReducers } from 'redux';
import {
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_TEXT_SUCCESS,
  UPDATE_TASK_STATUS_SUCCESS,
} from '../actions/types';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function dataReducer(state = [], { type, payload }) {
  switch (type) {
    case FETCH_TASKS_SUCCESS:
      return payload;
    case ADD_TASK_SUCCESS:
      return [...state, payload];
    case UPDATE_TASK_TEXT_SUCCESS:
      return state.map(task =>
        task.id === payload.id ? { ...task, text: payload.text } : task,
      );
    case UPDATE_TASK_STATUS_SUCCESS:
      return state.map(task =>
        task.id === payload.id ? { ...task, status: payload.status } : task,
      );

    default:
      return state;
  }
}

function loadingReducer(state = false, { type }) {
  switch (type) {
    case FETCH_TASKS_START:
      return true;

    case FETCH_TASKS_SUCCESS:
    case ADD_TASK_SUCCESS:
    case UPDATE_TASK_TEXT_SUCCESS:
    case UPDATE_TASK_STATUS_SUCCESS:
    case FETCH_TASKS_FAIL:
      return false;

    default:
      return state;
  }
}

function errorReducer(state = null, { type, payload }) {
  switch (type) {
    case FETCH_TASKS_SUCCESS:
    case ADD_TASK_SUCCESS:
    case UPDATE_TASK_TEXT_SUCCESS:
    case UPDATE_TASK_STATUS_SUCCESS:
      return null;
    case FETCH_TASKS_FAIL:
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  data: dataReducer,
  loading: loadingReducer,
  error: errorReducer,
});
