import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import fileIndexReducer from './reducers/file-index-reducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    // TODO 改名为 APP-reducer 存放全局相关的 state
    fileIndex: fileIndexReducer,
    // 其他的可以使用 Restful API 形式命名，对应具体状态的含义
  },
});
