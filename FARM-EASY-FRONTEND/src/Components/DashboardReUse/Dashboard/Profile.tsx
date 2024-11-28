import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUserLocation, updateProfileImage } from "../../../Service/AccountService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string;
  role: string;
  createdOn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const MyProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const navigate = useNavigate();
  const { isAuthenticated, user: authUser } = useSelector((state: RootState) => state.auth);
  const userId = authUser?.user_id;

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      toast.error("User not authenticated");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
          setLocationData({
            address: fetchedUser.streetAddress || "",
            city: fetchedUser.city || "",
            state: fetchedUser.state || "",
            zipCode: fetchedUser.postalCode || "",
            country: fetchedUser.country || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("Failed to load user data.");
      }
    };

    fetchUser();
  }, [isAuthenticated, userId, navigate]);

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveLocation = async () => {
    try {
      await updateUserLocation(userId, locationData);
      toast.success("Location updated successfully!");
      setOpenLocationModal(false);
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update location.");
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSaveProfilePicture = async () => {
    if (profileImage) {
      try {
        await updateProfileImage(userId, profileImage);  // Call the updateProfileImage function
        toast.success("Profile picture updated successfully!");
        setOpenProfileModal(false);
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Failed to update profile picture.");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-10/12 md:w-3/5 mx-auto">
      <h1 className="w-full mx-auto mb-8 text-3xl md:text-4xl font-medium text-black">
        My Profile
      </h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-between rounded-md border-[1px] border-gray-200 bg-white p-6 md:p-8 md:px-12 gap-y-4 md:gap-y-0 shadow-lg">
        <div className="flex items-center gap-x-4">
          <img
            src={profileImage ? URL.createObjectURL(profileImage) : authUser?.profileUrl || `https://ui-avatars.com/api/?name=${authUser?.username}`}
            alt="profile"
            className="aspect-square w-[50px] md:w-[100px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg md:text-xl font-semibold text-black">{authUser?.username}</p>
            <p className="text-sm md:text-base text-gray-500">{authUser?.email}</p>
          </div>
        </div>
        <IconButton onClick={() => setOpenProfileModal(true)}>
          <CameraAltIcon color="primary" />
        </IconButton>
      </div>

      <div className="w-full my-10 flex flex-col gap-y-6 rounded-lg border border-gray-200 bg-white p-6 md:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-black">Profile Information</h2>
          <IconButton onClick={() => setOpenLocationModal(true)}>
            <EditIcon color="primary" />
          </IconButton>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[{ label: "Full Name", value: authUser?.username },
            { label: "Email", value: authUser?.email },
            { label: "Role", value: authUser?.role },
            { label: "City", value: user.city },
            { label: "State", value: user.state },
            { label: "Country", value: user.country },
            { label: "Postal Code", value: user.zipCode },
            { label: "Street Address", value: user.address },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-black font-medium">{label}</label>
              <p className="text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Picture Modal */}
      <Modal open={openProfileModal} onClose={() => setOpenProfileModal(false)}>
        <Box sx={{ maxWidth: 400, bgcolor: "white", p: 4, m: "auto", mt: "10%", borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6" mb={2}>Edit Profile Picture</Typography>
          <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: "#000d6b", color: "white" }}>
            Upload Image
            <input type="file" hidden onChange={handleProfileImageChange} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveProfilePicture}
            sx={{ backgroundColor: "#000d6b", color: "white", mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* Edit Location Modal */}
      <Modal open={openLocationModal} onClose={() => setOpenLocationModal(false)}>
        <Box sx={{ maxWidth: 500, bgcolor: "white", p: 4, m: "auto", mt: "10%", borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6" mb={2}>Edit Location</Typography>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            {["address", "city", "state", "zipCode", "country"].map((field) => (
              <TextField
                key={field}
                fullWidth
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={locationData[field as keyof typeof locationData]}
                onChange={handleLocationInputChange}
                margin="normal"
              />
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveLocation}
            sx={{ backgroundColor: "#000d6b", color: "white", mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MyProfile;
