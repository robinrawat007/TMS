// import axios from 'axios';
// import store from '../store';

// const instance = axios.create({
//   baseURL: '',
//   timeout: 5000,
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('tms_token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       store.dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
