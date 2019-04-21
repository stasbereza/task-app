/* eslint-disable-next-line */
export const getVisibleTasks = (tasks, filter) =>
  tasks.filter(
    task => task.username.includes(filter) || task.email.includes(filter),
  );
