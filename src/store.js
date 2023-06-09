import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';

// 问题：类组件如何灵活使用 react-redux
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
