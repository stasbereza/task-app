import axios from 'axios';
import MD5 from 'md5';
import {
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_TEXT_SUCCESS,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASKS_AMOUNT,
  CHANGE_SORT_FIELD,
  CHANGE_SORT_DIRECTION,
  CHANGE_PAGE,
  CHANGE_FILTER,
} from './types';

const URL = 'https://uxcandy.com/~shapoval/test-task-backend';

const fetchTasksStart = () => ({
  type: FETCH_TASKS_START,
});

const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

const fetchTasksFail = error => ({
  type: FETCH_TASKS_FAIL,
  payload: error,
});

const changeSortField = sortField => ({
  type: CHANGE_SORT_FIELD,
  payload: sortField,
});

const changeSortDirection = sortDirection => ({
  type: CHANGE_SORT_DIRECTION,
  payload: sortDirection,
});

const changePage = currentPage => ({
  type: CHANGE_PAGE,
  payload: currentPage,
});

const updateTasksAmount = totalTasks => ({
  type: UPDATE_TASKS_AMOUNT,
  payload: totalTasks,
});

const addTaskSuccess = task => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

const updateTaskTextSuccess = task => ({
  type: UPDATE_TASK_TEXT_SUCCESS,
  payload: task,
});

const updateTaskStatusSuccess = task => ({
  type: UPDATE_TASK_STATUS_SUCCESS,
  payload: task,
});

export const changeFilter = filter => ({
  type: CHANGE_FILTER,
  payload: filter,
});

export const fetchTasks = ({ page, sortField, sortDirection }) => dispatch => {
  dispatch(fetchTasksStart());
  dispatch(changePage(page));
  dispatch(changeSortField(sortField));
  dispatch(changeSortDirection(sortDirection));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const fetchTasksOnChangePage = (
  page,
  sortField,
  sortDirection,
) => dispatch => {
  dispatch(changePage(page));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const fetchSortedTasks = ({
  page,
  sortField,
  sortDirection,
}) => dispatch => {
  dispatch(fetchTasksStart());
  dispatch(changeSortField(sortField));
  dispatch(changeSortDirection(sortDirection));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const addTask = ({ username, email, text }) => dispatch => {
  const task = new FormData();
  task.append('username', username);
  task.append('email', email);
  task.append('text', text);

  axios({
    method: 'post',
    url: `${URL}/create?developer=Stanislav`,
    crossDomain: true,
    mimeType: 'multipart/form-data',
    contentType: false,
    processData: false,
    dataType: 'json',
    data: task,
  }).then(({ data: { message: newTask } }) =>
    dispatch(addTaskSuccess(newTask)),
  );
};

export const updateTaskText = ({
  id,
  text: { text },
  token = 'beejee',
}) => dispatch => {
  const taskToUpdate = { id, text };
  const url = `text=${text}&token=${token}`;
  const encodedUrl = encodeURI(url);
  const hex = MD5(encodedUrl);

  axios({
    method: 'post',
    url: `${URL}/edit/${id}/?developer=Stanislav`,
    crossDomain: true,
    mimeType: 'multipart/form-data',
    contentType: false,
    processData: false,
    dataType: 'string',
    data: `${url}&signature=${hex}`,
  }).then(
    ({ data }) =>
      data.status === 'ok' && dispatch(updateTaskTextSuccess(taskToUpdate)),
  );
};

export const updateTaskStatus = ({
  id,
  status,
  token = 'beejee',
}) => dispatch => {
  const taskToUpdate = { id, status };
  const url = `status=${status}&token=${token}`;
  const encodedUrl = encodeURI(url);
  const hex = MD5(encodedUrl);

  axios({
    method: 'post',
    url: `${URL}/edit/${id}/?developer=Stanislav`,
    crossDomain: true,
    mimeType: 'multipart/form-data',
    contentType: false,
    processData: false,
    dataType: 'string',
    data: `${url}&signature=${hex}`,
  }).then(
    ({ data }) =>
      data.status === 'ok' && dispatch(updateTaskStatusSuccess(taskToUpdate)),
  );
};
