import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  userName: "",
  _id: "",
  role: "",
  status: "",
  image: "", // Add the role field
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.userName = action.payload.data.userName;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role; // Set the role field
      state.status = action.payload.data.status; // Set the role field
      state.image = action.payload.data.image; // Set the role field
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.userName = "";
      state.email = "";
      state.role = ""; // Reset the role field
      state.status = ""; // Reset the role field
      state.image = ""; // Reset the role field
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { loginRedux, logoutRedux, setUsers } = userSlice.actions;
export default userSlice.reducer;
