import admin from '../admin';

export const signIn = ({ login, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (admin.login !== login) {
        reject('Login is incorrect!');
        return;
      }

      if (admin.password !== password) {
        reject('Invalid password!');
        return;
      }

      resolve({
        login: admin.login,
        password: admin.password,
      });
    }, 500);
  });
};

export const signOut = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
