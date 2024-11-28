import * as Yup from "yup";
export const calculatePasswordStrength = (password:string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[\W_]/.test(password)) strength += 1;
    return strength;
  };
export const getStrengthLabel = (strength:number) => {
  switch (strength) {
    case 0:
    case 1:
      return { text: "Very Weak", color: "bg-red-400", width: "25%" };
    case 2:
      return { text: "Weak", color: "bg-yellow-400", width: "50%" };
    case 3:
      return { text: "Good", color: "bg-blue-400", width: "75%" };
    case 4:
    case 5:
      return { text: "Best", color: "bg-green-400", width: "100%" };
    default:
      return { text: "Very Weak", color: "bg-red-400", width: "25%" };
  }
};

export const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match" )
    .required("Confirm Password is required"),
    otp: Yup.string().when('otpSent', (otpSent, schema) => {
      if (otpSent) {
        return schema
          .required('OTP is required')
          .length(6, 'OTP must be 6 digits');
      }
      return schema.notRequired();
    }),
});
