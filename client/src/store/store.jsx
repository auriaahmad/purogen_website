// // store.js
// import { createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// import rootReducer from './reducer/authReducer'; // Your combined reducers

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer, applyMiddleware(/* middleware here */));
// export const persistor = persistStore(store);
