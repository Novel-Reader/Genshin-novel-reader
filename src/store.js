import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter-slice-reducer';
import fileIndexReducer from './reducers/file-index-reducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    fileIndex: fileIndexReducer,
  },
});
