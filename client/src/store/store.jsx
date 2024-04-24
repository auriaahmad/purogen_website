import {create} from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  token: null,
  login: (userData) => {
    set({ user: userData.user, token: userData.token });
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  initialize: () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        set({ user, token: storedToken });
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  },
}));

export default useUserStore;