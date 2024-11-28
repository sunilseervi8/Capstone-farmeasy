import React, { useState} from 'react';
import toast from 'react-hot-toast'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { applyForLoan, Loan } from '../../../Service/LoanService'; // Import the service and model
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
// Define the initial loan form data based on Loan model

const steps = [
  { id: 1, title: 'Verify Your Details', description: 'Select your crop and a nearby dealer' },
  { id: 2, title: 'Select the Loan Offer', description: 'Compare and select the best offer' },
  { id: 3, title: 'Upload Your Documents', description: 'Apply online by uploading documents' },
  { id: 4, title: 'Verification', description: 'Financier verifies and sanctions loan' },
];

const LoanPage: React.FC = () => {
  const {  user } = useSelector((state: RootState) => state.auth);
  var userId = user?.user_id;
  const initialLoanForm: Loan = {
    productId: "",
    userId: userId,
    amount: 0,
    interestRate: 0,
    termInYears: 0,
    isApproved: false,
    annualIncome: 0,
    providerName: '',
  };
  const [loanForm, setLoanForm] = useState<Loan>(initialLoanForm);
  const [formStep, setFormStep] = useState<number>(1);
  // Handle input changes for TextField components
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanForm({
      ...loanForm,
      [name]: name === 'amount' || name === 'interestRate' || name === 'termInYears' || name === 'annualIncome'
        ? Number(value)
        : value,
    });
  };
  // Submit loan application
  const handleSubmit = async () => {
    try {
      console.log(loanForm); // Use applyForLoan service to submit the form data
      await applyForLoan(loanForm);
      toast.success('Loan application submitted successfully!');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      toast.error('Failed to submit loan application. Please try again.');
    }
  };

  const faqs = [
    { question: 'What is FarmEasy Loan Service?', answer: 'FarmEasy Loan Service provides end-to-end financing solutions tailored for farmers.' },
    { question: 'Is the loan available to everyone?', answer: 'Yes, loans are available to all eligible applicants with proper documentation.' },
    { question: 'What is the process for loan approval?', answer: 'You can apply online by uploading required documents. Approval is subject to verification.' },
    { question: 'Can I compare loan offers?', answer: 'Yes, you can compare various offers to select the best option for you.' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8 px-4 md:px-8">
      {/* Steps Section */}
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-4xl font-bold text-center text-custom-blue mb-12">4 Simple Steps to Finance Your Crop</h2>
        <div className="flex flex-col md:flex-row justify-between items-center relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center relative mb-8 md:mb-0 md:mx-4">
              <motion.div
                className="bg-custom-blue text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold mb-4 shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                {step.id}
              </motion.div>
              <h3 className="text-lg font-semibold text-custom-blue">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Loan Information Form */}
      <section className="w-full max-w-lg mb-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-custom-blue mb-6">Loan Information</h2>
        {formStep === 1 && (
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              fullWidth
              label="Loan Required For"
              name="loanFor"
              variant="outlined"
              value={loanForm.productId || ''}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              onClick={() => setFormStep(2)}
              sx={{backgroundColor:"#000d6b"}}
            >
              Next
            </Button>
          </motion.div>
        )}
        {formStep === 2 && (
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              fullWidth
              label="Expected Loan Amount"
              name="amount"
              variant="outlined"
              type="number"
              value={loanForm.amount}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Interest Rate"
              name="interestRate"
              variant="outlined"
              type="number"
              value={loanForm.interestRate}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Term in Years"
              name="termInYears"
              variant="outlined"
              type="number"
              value={loanForm.termInYears}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              onClick={() => setFormStep(3)}
              sx={{backgroundColor:"#000d6b"}}
            >
              Next
            </Button>
          </motion.div>
        )}
        {formStep === 3 && (
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              fullWidth
              label="Annual Income"
              name="annualIncome"
              variant="outlined"
              type="number"
              value={loanForm.annualIncome}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Provider Name"
              name="providerName"
              variant="outlined"
              value={loanForm.providerName}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{backgroundColor:"#000d6b"}}
            >
              Submit
            </Button>
          </motion.div>
        )}
      </section>
      {/* FAQ Section */}
      <section className="w-full max-w-4xl mb-20">
        <h2 className="text-4xl font-bold text-center text-custom-blue mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              className="bg-white shadow-md p-6 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <summary className="text-xl font-medium text-custom-blue flex items-center justify-between">
                {faq.question}
                <FaQuestionCircle className="ml-2" />
              </summary>
              <p className="text-gray-700 mt-4">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Contact Information */}
      <section className="mt-16 bg-custom-blue text-white py-16 w-full">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help? Contact Us</h2>
          <p className="mb-8 text-lg">If you have any questions, feel free to reach out to our support team.</p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16">
            <div className="flex items-center space-x-4">
              <FiPhone className="text-3xl" />
              <span className="text-xl">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaCheckCircle className="text-3xl" />
              <span className="text-xl">support@farmeasy.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanPage;
