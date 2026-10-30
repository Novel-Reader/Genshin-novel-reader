import { configureStore } from '@reduxjs/toolkit';
import fileIndexReducer from './reducers/file-index-reducer';

export default configureStore({
  reducer: {
    fileIndex: fileIndexReducer,
  },
});
