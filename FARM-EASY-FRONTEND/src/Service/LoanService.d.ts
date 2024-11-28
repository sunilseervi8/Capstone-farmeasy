export interface Loan {
    productId?: string | null;
    userId: any;
    amount: number;
    interestRate: number;
    termInYears: number;
    isApproved: boolean;
    annualIncome: number;
    providerName: string;
}
export declare const getAllLoanApplications: () => Promise<Loan[]>;
export declare const applyForLoan: (loanApplication: Loan) => Promise<{
    status: string;
}>;
