// slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "../../Models/AuthSliceModel";

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userRole: undefined,
};

const authSlice = createSlice({
  // name
  name: "auth",
  // initial state
  initialState,
  // Reducer
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log("pay lo", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    updateUserSellerStatus: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.isSeller = action.payload;
      }
    },
  },
});
// console.log(User.role)
export const { login, logout, updateUserSellerStatus } = authSlice.actions;
export default authSlice.reducer;
