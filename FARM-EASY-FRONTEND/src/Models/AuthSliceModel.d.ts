export interface User {
    username: string;
    role: string;
    email: string;
    token: string;
    profileUrl: string;
    user_id: string;
    isSeller: string;
}
export interface AuthState {
    userRole: any;
    isAuthenticated: boolean;
    user: User | null;
}
