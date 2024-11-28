import ProtectedRoute from './Redux/ProtectedRoutes/ProtectedRoutes';
import Header from './Components/Navigation/Header'
import About from './Pages/About'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Forms/Login/Login'
import Register from './Components/Forms/Register/Register'
import ContactForm from './Pages/Contact'
import AddProduct from './Components/Product/Machines/AddProduct'
import Home from './Pages/Home'
import CropsHome from './Components/Product/Crops/CropsHome'
import ForgotPassword from './Components/Forms/Login/ForgotPassword'
import ProductHome from './Components/Product/Machines/ProductHome';
import ResetPasswordValidator from './Components/Forms/Login/ResetPasswordValidator'
import FarmingCourses from './Components/FarmerBenificialService/Awareness/AwarenessVideos';
import Rentals from './Components/Product/Rentals/RentalsPage';
import SellerCard from './Components/DashboardReUse/DashboardData/DashboardServices/ApproveSeller'
import RentalList from './Components/DashboardReUse/DashboardData/DashboardServices/Rental'
import CropsListing from './Components/DashboardReUse/DashboardData/DashboardServices/CropsListing'
import MyProfile from "./Components/DashboardReUse/Dashboard/Profile";
import BecomeSellerRequest from "./Components/Home/WantToBeSeller";
import ProductPage from './Components/DashboardReUse/DashboardData/DashboardProducts/ProductPage';
import DashboardDemo from './Components/DashboardReUse/Dashboard/Dashbord';
import LoanPage from './Components/FarmerBenificialService/Loan/LoanPage';
import RentalBooking from  './Components/DashboardReUse/DashboardData/Booking'
import Loan from './Components/FarmerBenificialService/Loan/LoanPage'
import Insurance from './Components/FarmerBenificialService/Insurance/Insurance'
import InsurancePlans from './Components/FarmerBenificialService/Insurance/InsurancePlans'


function App() {
  return (
    <>
      <div className='mb-64px '>
        <Header />
      </div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="loan" element={<LoanPage />} />
        <Route path="/dashboarddemo" element={<DashboardDemo />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ProtectedRoute element={<ResetPasswordValidator />} />} />
        <Route path="/Awarenessvideos" element={<FarmingCourses />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/insuranceplan" element={<InsurancePlans />} />
        {/* Protected Routes */}
        <Route path="/productHome" element={<ProtectedRoute element={<ProductHome />} />} />
        <Route path="/crops" element={<ProtectedRoute element={<CropsHome />} />} />
        <Route path="/rentals" element={<ProtectedRoute element={<Rentals />} />} />
        <Route path="/becomeSeller" element={<ProtectedRoute element={<BecomeSellerRequest />} />} />
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardDemo />} />}>
          <Route path="viewproduct" element={<ProtectedRoute element={<ProductPage />} />} />
          <Route path="sellerCard" element={<ProtectedRoute element={<SellerCard />} />} />
          <Route path="rentals" element={<ProtectedRoute element={<RentalList />} />} />
          <Route path="crops" element={<ProtectedRoute element={<CropsListing />} />} />
          <Route path="myprofile" element={<ProtectedRoute element={<MyProfile />} />} />
          <Route path="addproduct" element={<ProtectedRoute element={<AddProduct />} />} />
          <Route path="rentalbooking" element={<ProtectedRoute element={<RentalBooking />} />} />
          <Route index element={<ProtectedRoute element={<MyProfile />} />} />
        </Route>
      </Routes>

    </>

  )
}

export default App
 

