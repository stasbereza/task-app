import { combineReducers } from 'redux';
import taskReducer from './tasks';
import sortReducer from './sort';
import pagerReducer from './pager';
import filterReducer from './filter';
import authReducer from './auth';

const rootReducer = combineReducers({
  tasks: taskReducer,
  pager: pagerReducer,
  sort: sortReducer,
  filter: filterReducer,
  auth: authReducer,
});

export default rootReducer;
