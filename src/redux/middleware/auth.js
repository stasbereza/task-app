import { SAVE_SESSION } from '../actions/types';

const auth = store => next => action => {
  if (action.type && action.type === SAVE_SESSION) {
    localStorage.setItem('session', JSON.stringify(store.getState().auth));
  }

  next(action);
};

export default auth;
