import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', title: 'First Post', content: 'This is the first post' },
  { id: '2', title: 'Second Post', content: 'This is the second post' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
