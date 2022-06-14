import { apiSlice } from "@features/api/apiSlice";
import notificationsReducer from "@features/notifications/notificationsSlice";
import postsReducer from "@features/posts/postsSlice";
import usersReducer from "@features/users/usersSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
