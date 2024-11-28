

import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import MenuItem from "./MenuItem";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { menuItems } from "../Constants";
import { useNavigate } from "react-router";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../Common/ConfirmationModal";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../Redux/Store";

interface ConfirmationModalData {
  text1: string;
  text2?: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModalData | null>(null);
  const roles = useSelector((state: RootState) => state.auth.user?.role);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full bg-custom-blue text-white transition-all z-30 flex flex-col duration-300 dark:bg-slate-700 ${isOpen ? "w-72" : "w-20 items-center"}`}
      >
        {/* Sidebar Logo */}
        <div className="flex items-center justify-center py-4">
          <LuLayoutDashboard
            className={`text-2xl text-teal-700 transition-all ${isOpen ? "w-12" : "w-8"}`}
          />
        </div>
        
        {/* Menu List */}
        <div className="mt-6 flex-1">
          {menuItems.map((item, index) => (
            roles?.includes(item.role) && (
              <MenuItem
                path={item.path}
                key={index}
                icon={item.icon}
                name={item.name}
                isOpen={isOpen}
                isLogout={item.isLogout}
              />
            )
          ))}
           <MenuItem
                path={menuItems[9].path}
               
                icon={menuItems[9].icon}
                name={menuItems[9].name}
                isOpen={isOpen}
                isLogout={menuItems[9].isLogout}
              />

          {/* Logout Item */}
          <li
            className="py-4 px-6 cursor-pointer space-x-4 rounded-md px-4 py-3 text-gray-400 duration-500 hover:bg-white hover:text-black flex items-center gap-2"
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => handleLogout(),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            <span className="text-xl">
              <VscSignOut />
            </span>
            {isOpen && <span className="text-[14px] overflow-hidden">Logout</span>}
          </li>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="m-2 flex items-center justify-center rounded-md bg-gray-700 p-3 text-2xl font-bold hover:bg-white hover:text-black duration-300"
        >
          {isOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;

