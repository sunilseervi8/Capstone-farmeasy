import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  CardActions,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

// Seller interface
interface Seller {
  id: string;
  fullName: string;
  isVerified: boolean;
  profileImg?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  updatedAt: string;
}

const SellersList: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('https://localhost:8000/api/Account/all-sellers');
        setSellers(response.data);
      } catch (error) {
        console.error('Failed to fetch sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  // Function to handle approving the seller
  const handleApprove = async (id: string, index: number) => {
    try {
      console.log(id)
      await axios.post(`https://localhost:8000/api/Account/approve-seller/${id}`);
      setSellers((prevSellers) => {
        const updatedSellers = [...prevSellers];
        updatedSellers[index].isVerified = true;
        return updatedSellers;
      });
    } catch (error) {
      console.error('Failed to approve seller:', error);
    }
  };

  // Filter sellers based on the selected filter
  const filteredSellers = sellers.filter((seller) =>
    filter === 'all'
      ? true
      : filter === 'verified'
      ? seller.isVerified
      : !seller.isVerified
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#000d6b' }}>
        Sellers Management
      </Typography>

      {/* Filter Buttons */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => {setFilter(newFilter || 'all'); console.log(e)}}
        aria-label="seller filter"
        sx={{ mb: 4 }}
      >
       
        <ToggleButton value="all" aria-label="all sellers">
          All
        </ToggleButton>
        <ToggleButton value="verified" aria-label="verified sellers">
          Verified
        </ToggleButton>
        <ToggleButton value="unverified" aria-label="unverified sellers">
          Unverified
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Sellers Grid */}
      <Grid container spacing={3}>
        {filteredSellers.map((seller, index) => (
          <Grid item xs={12} sm={6} md={4} key={seller.id}>
            <Card
              sx={{
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
                backgroundColor: seller.isVerified ? '#E0F7FA' : '#FDEDEC',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    src={seller.profileImg || 'https://via.placeholder.com/100'}
                    alt={seller.fullName}
                    sx={{ width: 80, height: 80 }}
                  />
                  <div>
                    <Typography variant="h6">{seller.fullName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                       {seller.address}, {seller.city}, {seller.state}, {seller.zipCode}, {seller.country}
                    </Typography>
                  </div>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Last updated: {new Date(seller.updatedAt).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    color: seller.isVerified ? '#388E3C' : '#E53935',
                  }}
                >
                  {seller.isVerified ? (
                    <>
                      <CheckCircleOutlineIcon sx={{ mr: 1 }} /> Verified Seller
                    </>
                  ) : (
                    <>
                      <CancelIcon sx={{ mr: 1 }} /> Unverified Seller
                    </>
                  )}
                </Typography>
              </CardContent>

              {/* Approval Button for Unverified Sellers */}
              {!seller.isVerified && (
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleApprove(seller.id, index)}
                    sx={{
                      backgroundColor: '#1A659E',
                      '&:hover': { backgroundColor: '#004E89' },
                    }}
                  >
                    Approve Seller
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SellersList;
