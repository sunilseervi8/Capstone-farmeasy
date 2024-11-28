import { User, AuthState } from "../../Models/AuthSliceModel";
export declare const login: import("@reduxjs/toolkit").ActionCreatorWithPayload<User, "auth/login">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">, updateUserSellerStatus: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "auth/updateUserSellerStatus">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
