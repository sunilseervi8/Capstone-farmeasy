import React, { useState } from 'react';

interface Plan {
  logo: string;
  name: string;
  planType: string;
  claimsSettled: string;
  price: string;
}

const insurancePlans: { [category: string]: Plan[] } = {
  'Third Party': [
    { logo: 'https://static.pbcdn.in/car-cdn/car2.0/insurer/13.png', name: 'Bajaj Allianz', planType: 'Third Party', claimsSettled: '98.5%', price: '₹2094' },
    { logo: 'https://www.policybazaar.com/images/insurer-logo/cholamandlam-general-insurance.jpg', name: 'Chola MS', planType: 'Third Party', claimsSettled: '96%', price: '₹2094' },
    // ... other third-party plans
  ],
  Comprehensive: [
    { logo: 'https://www.policybazaar.com/images/insurer-logo/digit-insurance.png', name: 'Digit', planType: 'Comprehensive', claimsSettled: '96%', price: '₹5000' },
    // ...other comprehensive plans
  ],
  'Own Damage': [
    { logo: 'https://www.policybazaar.com/images/insurer-logo/future-generali-general-insurance.jpg', name: 'Future Generali', planType: 'Own Damage', claimsSettled: '96.3%', price: '₹4500' },
    // ...other own damage plans
  ],
  'Trending Plans': [
    { logo: 'data:image/png;base64,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', name: 'HDFC Ergo', planType: 'Trending', claimsSettled: '99%', price: '₹6000' },
    // ...other trending plans
  ],
};

const insuranceCompanies: Plan[] = [
  { logo: 'https://www.policybazaar.com/images/insurer-logo/bajaj-allianz-general-insurance.jpg', name: 'Bajaj Allianz Car Insurance', planType: '', claimsSettled: '', price: '' },
  { logo: 'https://www.policybazaar.com/images/insurer-logo/cholamandlam-general-insurance.jpg', name: 'Chola MS Car Insurance', planType: '', claimsSettled: '', price: '' },
  { logo: 'https://www.policybazaar.com/images/insurer-logo/digit-insurance.png', name: 'Digit Car Insurance', planType: '', claimsSettled: '', price: '' },
  { logo: 'https://www.policybazaar.com/images/insurer-logo/future-generali-general-insurance.jpg', name: 'Future Generali Car Insurance', planType: '', claimsSettled: '', price: '' },
  { logo: 'data:image/png;base64,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', name: 'HDFC Ergo Car Insurance', planType: '', claimsSettled: '', price: '' },
  { logo: 'data:image/jpeg;base64,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', name: 'ICICI Lombard Car Insurance', planType: '', claimsSettled: '', price: '' },
  ];

 
  
  const PlanSelector: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Third Party');
  
    return (
      <div className=" flex flex-col md:flex-row gap-6">
        {/* Right Section: Insurance Companies */}
        <div className="flex-1 mt-20">
          {/* Category Tabs */}
          <div className="flex justify-between items-center p-4 rounded-lg bg-gray-100">
            {Object.keys(insurancePlans).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-base font-medium rounded-lg focus:outline-none transition-all duration-200 ease-in-out ${
                  selectedCategory === category ? 'bg-custom-blue text-white' : 'bg-transparent text-gray-700 hover:bg-hover-blue hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
  
          {/* Insurance Plans */}
          <div className="space-y-4 mt-">
            {insurancePlans[selectedCategory].map((plan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <img src={plan.logo} alt={plan.name} className="w-12 h-12 object-contain" />
                <div className="flex flex-col flex-1 px-4">
                  <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                  <p className="text-sm text-gray-500">Plan Type: {plan.planType}</p>
                  <p className="text-sm text-gray-500">Claims Settled: {plan.claimsSettled}</p>
                </div>
                <button className="bg-custom-blue text-white px-4 py-2 rounded-md text-base font-semibold">
                  {plan.price} →
                </button>
              </div>
            ))}
          </div>
        </div>
  
        {/* Left Section: Vehicle Insurance Companies */}
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Vehicle insurance companies</h2>
          <div className="grid grid-cols-2 gap-4">
            {insuranceCompanies.map((company, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                <img src={company.logo} alt={company.name} className="w-16 h-16 object-contain mb-2" />
                <p className="text-sm text-center text-txt-blue font-semibold">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PlanSelector;
  