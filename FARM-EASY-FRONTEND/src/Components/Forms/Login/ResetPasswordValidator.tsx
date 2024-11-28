import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../../../Service/AccountService';
import { ResetPasswordValues } from '../../../Models/AccountsModel'

const useQuery = () => {
  // Uses `useLocation` to access current URL and parse search parameters
  return new URLSearchParams(useLocation().search);
};

const ResetPassword: React.FC = () => {
  // Initialize query parameters for the reset password link
  const query = useQuery();
  const email = query.get('email'); // Extracts 'email' parameter from URL
  const token = query.get('token'); // Extracts 'token' parameter from URL
  const navigate = useNavigate();
  // Initial values for the reset password form
  const initialValues: ResetPasswordValues = {
    newPassword: '', // User's new password field
    confirmPassword: '', // Confirmation field for new password
  };

  //  Validation
  const validationSchema = Yup.object({
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters')
      .required('New password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      //one of will compare the password and confirm password are same
      .required('Confirm password is required'),
  });

  const onSubmit = async (values: { newPassword: string; confirmPassword: string }, { setSubmitting }: any) => {
    try {
      // resect password from the account service
      await resetPassword({
        email: email as string,
        token: token as string,
        newPassword: values.newPassword,
      });
      toast.success('Password has been successfully reset!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='container bg-[#E0F2FE] min-h-screen '>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 w-screen py-16 ">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4 ">
              {/* Password field  */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 ">
                  New Password
                </label>
                <Field type="password" name="newPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {/* Confirm password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Field type="password" name="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"           />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {/* Submit button */}
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-green-700 transition" >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default ResetPassword;