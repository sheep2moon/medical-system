import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabaseConfig';

export const fetchUserProfile = createAsyncThunk(
  'users/fetchProfile',
  async (userId, ThunkApi) => {
    const res = await supabase.from('profiles').select().eq('id', userId);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    visits: [],
    username: '',
    age: null,
    data: null,
    error: null,
    is_doctor: false,
  },
  reducers: {
    updateUser: (state, action) => {
      const data = action.payload;
      console.log(data);
      if (data) {
        state.id = data?.id;
        state.age = data?.age;
        state.username = data?.username;
        state.visits = data?.visits;
        state.is_doctor = data?.is_doctor;
      } else {
        state.age = null;
        state.username = null;
        state.id = null;
        state.visits = null;
        state.is_doctor = null;
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
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      console.log('====================================');
      console.log(action.payload);
      console.log('====================================');
      state.id = action.payload[0].id;
      state.age = action.payload[0].age;
      state.username = action.payload[0].username;
      state.visits = action.payload[0].visits_id;
      state.is_doctor = action.payload[0].is_doctor;
    });
  },
});

export const { addVisit, updateUser, removeVisit } = userSlice.actions;
export default userSlice.reducer;
