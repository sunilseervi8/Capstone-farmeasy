export declare const registerUser: (user: any) => Promise<any>;
export declare const loginUser: (user: any) => Promise<any>;
export declare const forgotPassword: (email: any) => Promise<any>;
export declare const resetPassword: (data: any) => Promise<any>;
interface GoogleUserData {
    name: any;
    email: string;
    profileUrl: string;
}
export declare const sendGoogleDataToBackend: (googleUserData: GoogleUserData) => Promise<any>;
export declare const getUserById: (userId: string) => Promise<any>;
export declare const requestSellerRole: (userId: string) => Promise<any>;
export declare const updateUserLocation: (userId: any, locationData: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}) => Promise<any>;
export declare const updateProfileImage: (userId: any, image: File) => Promise<any>;
export {};
