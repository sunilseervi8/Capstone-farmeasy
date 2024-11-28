import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box, Button, Drawer, List, ListItem, ListItemText,
  Divider, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Dropdown icon
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { logout } from '../../Redux/Slicer/AuthSlice'; // Import the logout action
import { Sync, AccountCircle, Logout } from '@mui/icons-material';


const NavbarWithProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [productAnchorEl, setProductAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const isSeller = useSelector((state: RootState) => state.auth.user?.isSeller);
  const roles = useSelector((state: RootState) => state.auth.user?.role); // Assuming role is an array
  const menuItems = ['Home', 'About', 'Product', 'Crops', 'Contact','Insurance','Loan'];

  // Open Drawer for mobile menu
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Open and close the dropdown on click
  const handleProductClick = (event: React.MouseEvent<HTMLElement>) => {
    setProductAnchorEl(event.currentTarget);
  };
  //close of the hover dropdown
  const handleProductClose = () => {
    setProductAnchorEl(null);
  };
  // Hamberge item collapese/open button
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    handleProductClose();
  };

  // Extract user initials i.e first letters of the first name and th elast name
  const getInitials = (name: string | undefined): string => {
    if (!name) return '';
    const nameParts = name.trim().split(' ');
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  // Mobile drawer menu for navigation
  const mobileMenu: JSX.Element = (
    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
      {/* Menu item array is displayed here */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item} component={Link} to={`/${item.toLowerCase()}`}
            onClick={handleDrawerToggle}>
            <ListItemText primary={item} sx={{ textTransform: 'capitalize' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
  return (
    <>
      <AppBar
        position="absolute" sx={{ backgroundColor: '#ffff', backdropFilter: 'blur(10px)', }}
      >
        <Toolbar sx={{ minHeight: '48px', paddingX: { xs: 1, sm: 2 }, }}> {/* Ensure no overflow */}
          {/* Overflow rendering */}
          {isMobile ? (
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              {/* Hamberg icon toggle buuton */}
              <IconButton edge="start" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              {/* Nav bar title */}
              <img src="public/Images/logo.png" alt="Logo" style={{ width:150, height:45, marginRight: 8 }} /> {/* Adjust size and margin */}
              {mobileMenu}
              {/* Condition rendering of the profile Avatar  */}
              {isAuthenticated ? (
                <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
                  {user?.profileUrl ? (
                    // initial letter display as avatar
                    <Avatar sx={{ width: 32, height: 32 }} src={user.profileUrl} alt={user?.username} />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32 }}>{getInitials(user?.username)}</Avatar>
                  )}
                </IconButton>
                // If not autthenticated then show sigin butto
              ) : (
                <Button component={Link} to="/login" sx={{ backgroundColor: "#000d6b", color: "#fff", }}>Sign In</Button>
              )}
            </Box>
            // Mobile view ends
          ) : (
            // Desktop view starts 
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', color: 'black', fontWeight: '600' }}>
               <img src="public/Images/logo.png" alt="Logo" style={{ width:150, height:45, marginRight: 8 }} /> {/* Adjust size and margin */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}> {/* Added flex properties */}
                <Button
                  color="inherit" component={Link}
                  to="/"
                  sx={{
                    textTransform: 'capitalize',
                    color: 'black',
                    fontWeight: '600',
                    '&:hover': { color: 'rgba(0, 173, 255, 0.8)' }
                  }}>
                  Home
                </Button>
                {/* Dropdown Trigger for "Products" */}
                <Button
                  onClick={handleProductClick}
                  endIcon={<ArrowDropDownIcon />} // Add a dropdown icon
                  sx={{
                    textTransform: 'capitalize',
                    color: 'black',
                    fontWeight: '600',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: 'rgba(0, 173, 255, 0.8)' }
                  }} >
                  Services
                </Button>

                {/* Dropdown Menu */}
                <Menu
                  id="product-submenu"
                  anchorEl={productAnchorEl}
                  open={Boolean(productAnchorEl)}
                  onClose={handleProductClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center', // Centered horizontally under the button
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  sx={{
                    '& .MuiPaper-root': {
                      backgroundColor: '#f0f4f8', // Light, modern background color
                      color: '#1a202c', // Dark text for readability
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px', // Adjust padding for a clean look
                      transition: 'all 0.3s ease',
                      marginTop:'20px'
                    }
                  }} >
                  <MenuItem
                    component={Link} to="/producthome" sx={{textTransform: 'capitalize'}}   >Products</MenuItem>
                  <MenuItem  component={Link} to="/crops"  sx={{ textTransform: 'capitalize', }}  >Crops</MenuItem>
                  <MenuItem component={Link} to='/insurance' sx={{ textTransform: 'capitalize' }}>Insurance</MenuItem>
                  <MenuItem component={Link} to='/loan' sx={{ textTransform: 'capitalize' }}>Loan</MenuItem>
                </Menu>

                <Button color="inherit" component={Link} to="/About" sx={{ textTransform: 'capitalize', color: 'black', fontWeight: '600', '&:hover': { color: 'rgba(0, 173, 255, 0.8)' } }}>About</Button>
                <Button color="inherit" component={Link} to="/contact" sx={{ textTransform: 'capitalize', color: 'black', fontWeight: '600', '&:hover': { color: 'rgba(0, 173, 255, 0.8)' } }}>Contact</Button>
                <Button color="inherit" component={Link} to="/awarenessvideos" sx={{ textTransform: 'capitalize', color: 'black', fontWeight: '600', '&:hover': { color: 'rgba(0, 173, 255, 0.8)' } }}>Awareness</Button>
              </Box>

              {isAuthenticated ? (
                <IconButton color="inherit" onClick={handleMenuClick}>
                  {user?.profileUrl ? (
                    <Avatar sx={{ width: 34, height: 34 }} src={user?.profileUrl} alt={user?.username} />
                  ) : (<Avatar sx={{ width: 34, height: 34 }}>{getInitials(user?.username)}</Avatar>  )}
                </IconButton>
              ) : (
                <Button component={Link} to="/login" sx={{ backgroundColor: "#000d6b", color: "#fff", fontWeight: '600' }}>Sign In</Button>
              )}
            </Box>

          )}
          {/* Profile Dropdown Menu */}
          {isAuthenticated && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 4,
                sx: { width: 300, borderRadius: '8px', marginTop: '8px' },
              }}  >

              {/* Profile Info Section */}
              <Box sx={{ textAlign: 'center', padding: '16px 0', marginBottom: '20px', backgroundColor: '#ffe0b2', marginTop: '-8px' }}>
                {user?.profileUrl ? (
                  <Avatar sx={{ width: 64, height: 64, margin: 'auto' }} src={user.profileUrl} alt={user?.username} />
                ) : (
                  <Avatar sx={{ width: 64, height: 64, margin: 'auto' }}>{getInitials(user?.username)}</Avatar>
                )}
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '8px', textTransform: 'capitalize' }}>{user?.username}</Typography>
                <Typography variant="body2" color="textSecondary">{user?.email}</Typography>
              </Box>

              {/* Sync and Manage Account Section */}
              <MenuItem component={Link} to='/dashboard'>
                <ListItemIcon>
                  <Sync fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" sx={{ textTransform: 'capitalize' }}>Dashboard</Typography>
              </MenuItem>

              <MenuItem component={Link} to='/dashboard/myprofile'>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" sx={{ textTransform: 'capitalize' }}>Manage Profile</Typography>
              </MenuItem>

              {/* Divider */}
              <Divider />
              {/* Other Profiles Section */}
              <Box sx={{ padding: '0px 16px' }}>
                <Typography variant="body2" color="textSecondary" sx={{ textTransform: 'capitalize' }}>Other profiles</Typography>
                {/* Example Profiles */}
                {!roles?.includes('seller') && isSeller == "true" && (
                  <MenuItem component={Link} to='/becomeSeller'>
                    <Avatar sx={{ width: 24, height: 24, backgroundColor: '#2196f3' }}>
                      <AccountCircle fontSize="small" />
                    </Avatar>
                    <Typography sx={{ marginLeft: '8px', textTransform: 'capitalize' }}>
                      Want to be Seller
                    </Typography>
                  </MenuItem>

                )}
                {/* Logout Button */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit" sx={{ textTransform: 'capitalize' }}>Logout</Typography>
                </MenuItem>
              </Box>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingBottom: '64px', overflow: 'hidden' }} /> {/* Ensures no content underflows */}
    </>
  );
};
export default NavbarWithProfile;
