// import apiClient from './apiClient';

// interface RegisterData {
//   username: string;
//   email: string;
//   password: string;
//   re_password: string;
// }

// interface LoginData {
//   username: string;
//   password: string;
// }

// const authApi = {
//   register: async (data: RegisterData) => {
//     const response = await apiClient.post('/user/auth/register/', data);
//     return response.data;
//   },

//   login: async (data: LoginData) => {
//     const response = await apiClient.post('/user/auth/login/', data);
//     const { access, refresh } = response.data;  // JWT returns 'access' and 'refresh'
//     localStorage.setItem('token', access);
//     localStorage.setItem('refreshToken', refresh);
//     return response.data;
// },

//   logout: async () => {
//     await apiClient.post('user/auth/logout/');
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//   },

//   refreshToken: async () => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     const response = await apiClient.post('/user/auth/refresh-token/', { refresh_token: refreshToken });
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     return token;
//   },

//   getProfile: async () => {
//     const response = await apiClient.get('/user/me/');
//     return response.data;
//   },
// };

// export default authApi;

import apiClient from './apiClient';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

interface LoginData {
  username: string;
  password: string;
}

const authApi = {
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/user/auth/register/', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post('/user/auth/login/', data);
    const { access, refresh } = response.data;
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    await apiClient.post('user/auth/logout/', { refresh: refreshToken });
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await apiClient.post('/user/auth/refresh-token/', { refresh: refreshToken });
    const { access } = response.data;
    localStorage.setItem('token', access);
    return access;
  },

  getProfile: async () => {
    const response = await apiClient.get('/user/me/');
    return response.data;
  },
};

export default authApi;