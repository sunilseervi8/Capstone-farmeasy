import axios from 'axios';

const _url = import.meta.env.VITE_API_URL_Loan;

export interface Loan { 
          
  productId?: string | null;
  userId: any,  
  amount: number;
  interestRate: number;
  termInYears: number;
  isApproved: boolean;
  annualIncome: number;
  providerName: string;
}

export const getAllLoanApplications = async (): Promise<Loan[]> => {
  try {
    const response = await axios.get(`${_url}/loans`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching loan applications');
  }
};


// Submit a new loan application
export const applyForLoan = async (loanApplication: Loan): Promise<{ status: string }> => {
  try {
    console
    const response = await axios.post(`${_url}/apply`, loanApplication);
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Error applying for loan');
  }
};