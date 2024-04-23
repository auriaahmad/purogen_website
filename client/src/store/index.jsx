// // store/index.js
// import { createStore, combineReducers } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import authenticationReducer from './reducers/authenticationReducer';

// const rootReducer = combineReducers({
//   authentication: authenticationReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['authentication'], // Only authentication state will be persisted
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);

// store.js
// import create from 'zustand';
// import { persist } from 'zustand/middleware';

// export const useGlobalStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       updateUser: (user) => set({ user }),
//       cookies: {
//         accepted: false,
//         rejected: false,
//       },
//       updateCookiesChoice: ({ accepted, rejected }) =>
//         set((state) => ({ cookies: { ...state.cookies, accepted, rejected } })),
//       loading: false,
//       setLoading: (val) => set({ loading: val }),
//     }),
//     {
//       name: 'purogen-storage',
//       getStorage: () => localStorage,
//     }
//   )
// );
