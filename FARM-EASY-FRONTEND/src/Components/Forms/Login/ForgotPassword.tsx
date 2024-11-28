import { useState } from "react";
import {forgotPassword} from '../../../Service/AccountService'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (event: React.FormEvent) => {
      // prevent default reload
    event.preventDefault();
    try {
      console.log(email)
        // Send password reset email
        forgotPassword(email).then(()=>{
         toast.success("Password reset email sent! Check your inbox.");
        }).catch(( )=>{
          toast.error('Failed to send password reset email. Please check your email address.');
        })
        // Error me4ssage on the top section
        setMessage('Password reset email sent! Check your inbox.');
        setError('');
      } catch (err) {
        // Failed message
        setMessage('');
        setError('Failed to send password reset email. Please check your email address.');
      }
    };
    
    return (
        <div className="container mx-auto bg-[#E0F2FE] min-h-screen ">
          <div className="items-center max-w-lg  bg-gray-100">
          <div className="bg-white min-w-[500px] w-full shadow-md rounded px-8 pt-6 pb-8 ">
            <h2 className="text-2xl mb-4">Forgot Password</h2>
            {/* error message display section om the top  */}
            {message && <p className="text-txt-blue">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleSubmit}>
              {/* Email section */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="bg-custom-blue hover:bg-hover-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Reset Email
              </button>
            </form>
            {/* routes back to the login page */}
            <div className="mt-4">
              <a href="/login" className="text-txt-blue">Back to Login</a>
            </div>
          </div>
        </div>
        </div>
      );
};

export default ForgotPassword;