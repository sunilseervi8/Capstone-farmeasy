import * as Yup from "yup";
export declare const calculatePasswordStrength: (password: string) => number;
export declare const getStrengthLabel: (strength: number) => {
    text: string;
    color: string;
    width: string;
};
export declare const validationSchema: Yup.ObjectSchema<{
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    otp: string | undefined;
}, Yup.AnyObject, {
    fullName: undefined;
    email: undefined;
    phoneNumber: undefined;
    password: undefined;
    confirmPassword: undefined;
    otp: undefined;
}, "">;
