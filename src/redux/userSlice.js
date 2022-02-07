import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    visits: [],
    email: '',
    username: '',
    age: null,
    data: null,
    error: null,
  },
  reducers: {
    updateUser: (state, action) => {
      const data = action.payload;
      console.log(data);
      if (data) {
        state.id = data?.id;
        state.email = data?.email;
        state.age = data?.age;
        state.username = data?.username;
        state.visits = data?.visits;
      }
    },
    addVisit: (state, action) => {
      state.visits.push(action.payload);
    },
    removeVisit: (state, action) => {
      state.visits = state.visits.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
  },
});

export const { addVisit, updateUser, removeVisit } = userSlice.actions;
export default userSlice.reducer;
