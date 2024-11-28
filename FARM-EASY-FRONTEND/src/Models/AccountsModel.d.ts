export interface DecodedToken {
    unique_name: string;
    role: string;
    nameid: string;
    email: string;
    given_name: string;
    isVerified: string;
}
export interface ResetPasswordValues {
    newPassword: string;
    confirmPassword: string;
}
