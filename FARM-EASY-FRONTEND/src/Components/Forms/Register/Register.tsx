import  { useEffect, useState } from "react";
import { useFormik } from "formik";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./register.css";
import { calculatePasswordStrength, getStrengthLabel, validationSchema } from '../../Features/PasswordProgressAndValid.ts';
import { useNavigate } from "react-router";
import { registerUser } from "../../../Service/AccountService.ts"
import axios from 'axios';
import toast from 'react-hot-toast'

const Register = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 510);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const Navigate = useNavigate();
  const [showOtpButton, setShowOtpButton] = useState(false);

  // taking the windows size using event listenetr for meadia query
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 510);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "buyer", // Default role
      otp: '',
    },

    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (otpVerified) {
        const { fullName, email, password, phoneNumber, role } = values;
        await registerUser({ fullName, email, password, phoneNumber, role })
          .then(() => {
            toast.success('Registration successful!');
            setSubmitting(true);
            Navigate('/login');
            resetForm();
          }).catch((err) => {
            toast.error(err.message);
            setOtpVerified(false);
          });
      }
      else {
        toast.error("Verify email id");
      }
    }
  });

  const handleSendOtp = async () => {
    if (formik.values.email) {
      try {
        // Send OTP to the backend
        await axios.post(
          'https://localhost:7119/api/User/SendOtp',
          JSON.stringify(formik.values.email), {
          headers: { 'Content-Type': 'application/json' },
        }
        );
        setOtpSent(true);
        setOtpError('');
        toast.success(`OTP sent to ${formik.values.email}`)
      } catch (err: any) {
        toast.error(err.message);
        setOtpError('Failed to send OTP. Please try again.');
      }
    }
  };

  // Handle OTP input change and auto-verify when 6 digits are entered
  const handleOtpChange = async (e: any) => {
    const { value } = e.target;
    formik.setFieldValue('otp', value);
    if (value.length === 6) {
      try {
        // Verify OTP with the backend
        const response = await axios.post(
          'https://localhost:7119/api/User/VerifyOtp',
          JSON.stringify(value),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response.status === 200) {
          setOtpVerified(true);
          setOtpError('');
          toast.success('OTP verified successfully');
          //once validate the button will bw disapper
          setShowOtpButton(false)
        } else {
          setOtpError('Incorrect OTP');
        }
      } catch (error: any) {
        toast.error('Error verifying OTP:', error);
        setOtpError('Failed to verify OTP. Please try again.');
      }
    }
  };

  const passwordStrength = calculatePasswordStrength(formik.values.password);
  const strengthLabel = getStrengthLabel(passwordStrength);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0F2FE]">
      <div className={`flex bg-white shadow-lg rounded-lg max-w-4xl w-full ${isSmallScreen ? "flex-col" : ""}`}>

        {/* Left side - Image with Text Overlay */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center">
          <img src="https://i.pinimg.com/474x/7d/93/3a/7d933ac3f168e7d1e07e28fbd874828b.jpg"
            alt="Farm Illustration" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10 text-center p-8 bg-black bg-opacity-50 rounded-lg">
            <h4 className="text-2xl font-semibold mb-4 text-white">Welcome to the Farm Easy, a platform for Farmers</h4>
            <p className="text-gray-300">Simplify your farming journey with Krishi Sadhan.</p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="right-section w-full lg:w-1/2 p-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#000d6b' }}>Register here!</h2>

          <form onSubmit={formik.handleSubmit}>
            {/* Full Name */}
            <div className="input-group mb-4">
              <input
                id="fullName"
                type="text" name="fullName"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div className="input-group mb-4 relative">
              <input
                id="email"
                type="email" name="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  setShowOtpButton(!!e.target.value); // Show OTP button if there's text
                }}
                onFocus={() => setShowOtpButton(true)} // Show OTP button on focus
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.email) setShowOtpButton(false); // Hide OTP button if email field is empty
                }}
                disabled={otpVerified}//diable the typing after the otpverified
              />
              {/* Otp toggle button */}
              {showOtpButton && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2  text-red px-3 py-1 rounded focus:outline-none"
                  style={{ fontSize: '0.875rem', fontWeight: '600' }}
                >
                  {otpSent ? 'Resend ' : 'Get OTP'}{/*toggle text*/}
                </button>
              )}
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            {/* OTP Input Field if otp sent and verified */}
            {otpSent && !otpVerified && (
              <div className="mb-4">
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={handleOtpChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.otp}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {otpError && <div className="text-red-500 text-sm mt-1">{otpError}</div>}
                {formik.touched.otp && formik.errors.otp && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.otp}</div>
                )}
              </div>
            )}

            {/* Phone Number with Country Code */}
            <div className="input-group1 mb-4   ">
              <PhoneInput
                country={'in'}
                value={formik.values.phoneNumber}
                onChange={phone => formik.setFieldValue('phoneNumber', phone)}
                inputClass="w-full xl:w-[350px] px-4 py-6 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b] "
                placeholder="Enter phone number"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
              )}
            </div>

            {/* Password */}
            <div className="input-group mb-4">
              <input
                id="password"
                type="password" name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => setPasswordFocused(true)}
                onBlurCapture={() => setPasswordFocused(false)} />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>

            {/* Password Strength Bar */}
            {passwordFocused && (
              <>
                <div className="w-full bg-gray-200 h-2 rounded-lg mb-1">
                  <div
                    className={`${strengthLabel.color} h-2 rounded-lg`}
                    style={{ width: strengthLabel.width }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  {strengthLabel.text}
                </div>
              </>
            )}

            {/* Confirm Password */}
            <div className="input-group mb-4">
              <input
                id="confirmPassword"
                type="password" name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
              )}
            </div>

            {/* Submit Button */}
            <button data-cy="submit" type="submit"
              disabled={otpVerified === true && formik.isSubmitting}
              className="w-full py-3 rounded-lg bg-[#000d6b] text-white font-semibold
              hover:bg-[#000a56] transition duration-300" >
              Register
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
