import {
  FaUser,
  FaCog,
  FaEye
} from "react-icons/fa";
import { GiDatabase } from "react-icons/gi";

import { GiWheat } from "react-icons/gi";
 
import { IoMdAddCircleOutline } from "react-icons/io";
// import { BiCalendarPlus ,BiCalendarCheck} from "react-icons/bi";
import { MdOutlineCarRental } from "react-icons/md";
import { BiCalendarCheck } from "react-icons/bi";


type MenuItem = {
  icon: React.ElementType;
  name: string;
  path: string,
  role: string,
  isLogout?: boolean;
};

export const menuItems: MenuItem[] = [
  
  {
    icon: MdOutlineCarRental,
    name: "Rentals",
    path: "/dashboard/rentals",
    role: "buyer"
  },
  {
    icon: MdOutlineCarRental,
    name: "Rentals",
    path: "/dashboard/rentals",
    role: "admin"
  },
  {
    icon: GiWheat,
    name: "Crops",
    path: "/dashboard/crops",
    role: "buyer"
  },
  {
    icon: GiWheat,
    name: "Crops",
    path: "/dashboard/crops",
    role: "admin"
  },
  {
    icon: GiDatabase,
    name: "MyData",
    path: "/dashboard/rentalbooking",
    role: "admin"
  },
  {
    icon: BiCalendarCheck,
    name: "MyBookings",
    path: "/dashboard/rentalbooking",
    role: "buyer"
  },
  {
    icon: BiCalendarCheck,
    name: "MyBookings",
    path: "/dashboard/uploaddesign",
    role: "admin"
  },

  {
    icon: FaEye,
    name: "View Product",
    path: "/dashboard/viewproduct",
    role: "seller"
  },
  
  {
    icon: IoMdAddCircleOutline,
    name: "Add Product",
    path: "/dashboard/addproduct",
    role: "seller"
  },
  {
    icon:   FaUser,

    name: "Profile",
    path: "/dashboard/myprofile",
    role: "open"
  },
  {
    icon: FaCog,
    name: "Settings",
    path: "/dashboard/setting",
    role: "open"
  },



];