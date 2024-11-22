// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./Reducers/userSlice";
// import internshipReducer from "./Reducers/internshipSlice";
// import employeReducer from "./Reducers/employeSlice";
// import jobReducer from "./Reducers/jobSlice";

// export const store = configureStore({
//     reducer: {
//         user: userReducer,
//         internship: internshipReducer,
//         employe: employeReducer,
//         job: jobReducer,
//     },
// });

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from "./Reducers/userSlice";
import internshipReducer from "./Reducers/internshipSlice";
import employeReducer from "./Reducers/employeSlice";
import jobReducer from "./Reducers/jobSlice";

const rootReducer = combineReducers({
    user: userReducer,
    internship: internshipReducer,
    employe: employeReducer,
    job: jobReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['user'], // reducers to exclude from persisting
  // whitelist: ['cart'], // reducers to include in persisting
  whitelist: ['user'],
  blacklist: ['internship']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);