// import React from 'react';
// import { useFormik } from 'formik';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { Stepper, Step, StepLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { motion } from 'framer-motion';
// import { FaIndustry, FaCalendarAlt } from 'react-icons/fa';
// import * as Yup from 'yup';
// import {  useNavigate } from 'react-router';

// interface FormData {
//   machineryNumber: string;
//   brand: string;
//   model: string;
//   registrationYear: string;
//   machinery: string;
//   company: string;
//   manualBrand: string;
//   manualModel: string;
//   manualRegistrationYear: string;
// }

// const steps = [
//   'Enter Machinery Details',
//   'Enter Farming Machinery & Company',
// ];

// const brands = ['John Deere', 'Kubota', 'Mahindra', 'New Holland', 'Caterpillar', 'Other'];
// const models = {
//   'John Deere': ['Model A', 'Model B', 'Model C'],
//   Kubota: ['L2501', 'MX5200', 'M5-091'],
//   Mahindra: ['Jivo', 'Arjun', 'Maxximo'],
//   'New Holland': ['T4', 'T5', 'Workmaster'],
//   Caterpillar: ['CAT D1', 'CAT D2', 'CAT D3'],
//   Other: [],
// };
// const years = ['2023', '2022', '2021', '2020', '2019', '2018', 'Other'];

// const InsuranceMultiForm: React.FC = () => {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [selectedBrand, setSelectedBrand] = React.useState<string>('');
//   const [isManualBrand, setIsManualBrand] = React.useState<boolean>(false);
//   const [isManualModel, setIsManualModel] = React.useState<boolean>(false);
//   const [isManualRegistrationYear, setIsManualRegistrationYear] = React.useState<boolean>(false);
//   const Navigate=useNavigate();
//   const formik = useFormik<FormData>({
//     initialValues: {
//       machineryNumber: '',
//       brand: '',
//       model: '',
//       registrationYear: '',
//       machinery: '',
//       company: '',
//       manualBrand: '',
//       manualModel: '',
//       manualRegistrationYear: '',
//     },
//     validationSchema: Yup.object({
//       machineryNumber: Yup.string()
//         .required('Vehicle number is required'),
//       brand: Yup.string().required('Vehicle brand is required'),
//       model: Yup.string().required('Vehicle model is required'),
//       registrationYear: Yup.string().required('Registration year is required'),
//       machinery: Yup.string().required('Vehicle information is required'),
//       company: Yup.string().required('Company name is required'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form Data:', values);
//       if(values){
//         Navigate('/insuranceplan');
//       }
//     },
//   });

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) {
//       setActiveStep((prev) => prev + 1);
//     } else {
//       formik.handleSubmit();
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
//   };

//   const handleBrandChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     const brand = event.target.value as string;
//     setSelectedBrand(brand);
//     formik.setFieldValue('brand', brand);
//     formik.setFieldValue('model', ''); // Reset model when brand changes
//     setIsManualBrand(brand === 'Other');
//   };

//   const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     const model = event.target.value as string;
//     formik.setFieldValue('model', model);
//     setIsManualModel(model === 'Other');
//   };

//   const handleRegistrationYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     const year = event.target.value as string;
//     formik.setFieldValue('registrationYear', year);
//     setIsManualRegistrationYear(year === 'Other');
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center py-8 px-4 md:px-8">
//       {/* <div className="flex flex-wrap w-full max-w-6xl">
//         {/* Left Side - Static Information Section */}
//         <div className="w-full md:w-1/2 pr-8 mb-8 md:mb-0">
//           <h1 className="text-4xl font-bold text-txt-blue mb-4">Vehicle Insurance</h1>
//           <p className="text-xl text-gray-700 mb-6">Prices starting at just ₹2,094/yr*</p>
//           <p className="text-sm text-gray-500 mb-6">This amount refers to the TP rates only</p>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <FaIndustry className="text-2xl text-txt-blue mr-4" />
//               <p className="text-lg text-gray-800">Doorstep Cashless Repairs</p>
//             </div>
//             <div className="flex items-center">
//               <FaCalendarAlt className="text-2xl text-txt-blue mr-4" />
//               <p className="text-lg text-gray-800">₹15 lakh Personal Accident Cover</p>
//             </div>
//             <div className="flex items-center">
//               <FaCalendarAlt className="text-2xl text-txt-blue mr-4" />
//               <p className="text-lg text-gray-800">Up to 50% off with NCB</p>
//             </div>
//           </div>
//         </div>
//         {/* Right Side - Form Section */}
//         <div className="w-full md:w-1/2">
//           <Stepper activeStep={activeStep} className="w-full max-w-lg mb-8 ">
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel >{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <form onSubmit={formik.handleSubmit} className="w-full bg-white p-8 rounded-lg shadow-lg">
//             {activeStep === 0 && (
//               <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <TextField
//                   fullWidth
//                   id="machineryNumber"
//                   name="machineryNumber"
//                   label="Enter Vehicle Number"
//                   variant="outlined"
//                   value={formik.values.machineryNumber}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.machineryNumber && Boolean(formik.errors.machineryNumber)}
//                   helperText={formik.touched.machineryNumber && formik.errors.machineryNumber}
//                 />
//                 <FormControl fullWidth variant="outlined">
//                   <InputLabel id="brand-label">Select Machinery Brand</InputLabel>
//                   <Select
//                     labelId="brand-label"
//                     id="brand"
//                     name="brand"
//                     value={formik.values.brand}
//                     onChange={handleBrandChange}
//                     label="Select Machinery Brand"
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.brand && Boolean(formik.errors.brand)}
//                   >
//                     {brands.map((brand) => (
//                       <MenuItem key={brand} value={brand}>
//                         {brand}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 {isManualBrand && (
//                   <TextField
//                     fullWidth
//                     id="manualBrand"
//                     name="manualBrand"
//                     label="Enter Machinery Brand"
//                     variant="outlined"
//                     value={formik.values.manualBrand}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                 )}
//                 {selectedBrand && !isManualBrand && (
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel id="model-label">Select Machinery Model</InputLabel>
//                     <Select
//                       labelId="model-label"
//                       id="model"
//                       name="model"
//                       value={formik.values.model}
//                       onChange={handleModelChange}
//                       label="Select Machinery Model"
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.model && Boolean(formik.errors.model)}
//                     >
//                       {(models[selectedBrand] || []).map((model) => (
//                         <MenuItem key={model} value={model}>
//                           {model}
//                         </MenuItem>
//                       ))}
//                       <MenuItem value="Other">Other</MenuItem>
//                     </Select>
//                   </FormControl>
//                 )}
//                 {isManualModel && (
//                   <TextField
//                     fullWidth
//                     id="manualModel"
//                     name="manualModel"
//                     label="Enter Machinery Model"
//                     variant="outlined"
//                     value={formik.values.manualModel}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                 )}
//                 <FormControl fullWidth variant="outlined">
//                   <InputLabel id="registrationYear-label">Select Registration Year</InputLabel>
//                   <Select
//                     labelId="registrationYear-label"
//                     id="registrationYear"
//                     name="registrationYear"
//                     value={formik.values.registrationYear}
//                     onChange={handleRegistrationYearChange}
//                     label="Select Registration Year"
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.registrationYear && Boolean(formik.errors.registrationYear)}
//                   >
//                     {years.map((year) => (
//                       <MenuItem key={year} value={year}>
//                         {year}
//                       </MenuItem>
//                     ))}
//                     <MenuItem value="Other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//                 {isManualRegistrationYear && (
//                   <TextField
//                     fullWidth
//                     id="manualRegistrationYear"
//                     name="manualRegistrationYear"
//                     label="Enter Registration Year"
//                     variant="outlined"
//                     value={formik.values.manualRegistrationYear}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                 )}
//               </motion.div>
//             )}
//             {activeStep === 1 && (
//               <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <TextField
//                   fullWidth
//                   id="machinery"
//                   name="machinery"
//                   label="Enter Farming Machinery"
//                   variant="outlined"
//                   value={formik.values.machinery}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.machinery && Boolean(formik.errors.machinery)}
//                   helperText={formik.touched.machinery && formik.errors.machinery}
//                 />
//                 <TextField
//                   fullWidth
//                   id="company"
//                   name="company"
//                   label="Enter Company Name"
//                   variant="outlined"
//                   value={formik.values.company}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.company && Boolean(formik.errors.company)}
//                   helperText={formik.touched.company && formik.errors.company}
//                 />
//               </motion.div>
//             )}
//             <div className="flex justify-between mt-8">
//               <Button
//                 variant="contained"
                 
//                 onClick={handleBack}
//                 disabled={activeStep === 0}
//                 style={{ backgroundColor: '#000d6b', color: 'white' }}
//               >
//                 Back
//               </Button>
//               <Button
//                 variant="contained"
                 
//                 onClick={handleNext}
//                 style={{ backgroundColor: '#000d6b', color: 'white' }}
//               >
//                 {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default InsuranceMultiForm;
// import React from 'react'

export default function Insurance() {
  return (
    <div>
      <p>Insurance</p>
    </div>
  )
}
