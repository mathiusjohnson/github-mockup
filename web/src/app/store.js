import { configureStore } from '@reduxjs/toolkit';

import reposReducer from '../features/repos/reposSlice';

export default configureStore({
  reducer: {
    repos: reposReducer,
  },
});
