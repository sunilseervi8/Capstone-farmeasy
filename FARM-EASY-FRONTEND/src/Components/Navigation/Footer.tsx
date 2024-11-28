import { Box, Grid, IconButton, Typography, Button, Link } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const services = ['Training', 'Coaching', 'Consulting'];
const contacts = ['Home', 'About', 'Contact'];
const socialMedia = [
  { icon: <WhatsAppIcon sx={{ color: '#25D366' }} />, label: 'WhatsApp', href: '#' },
  { icon: <YouTubeIcon sx={{ color: '#FF0000' }} />, label: 'YouTube', href: '#' },
  { icon: <InstagramIcon sx={{ color: '#C13584' }} />, label: 'Instagram', href: '#' },
  { icon: <FacebookIcon sx={{ color: '#4267B2' }} />, label: 'Facebook', href: '#' },
  { icon: <LinkedInIcon sx={{ color: '#0077b5' }} />, label: 'LinkedIn', href: '#' },
  { icon: <TwitterIcon sx={{ color: '#1DA1F2' }} />, label: 'Twitter', href: '#' },
];

const Footer = () => (
  <Box component="footer" sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#001f3f', color: '#ffffff', py: 10, px: 4 }}>
    {/* Decorative Wave Separator */}
    <Box
      sx={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        width: '100%',
        height: '80px',
        background: 'radial-gradient(circle, rgba(0,130,255,1) 0%, rgba(0,31,63,1) 100%)',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 60%)',
      }}
    />

    <Grid container spacing={6} justifyContent="center" sx={{ zIndex: 1, position: 'relative' }}>
      {/* Service Links */}
      <Grid item xs={12} sm={2} md={3}>
        <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
          Services
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
          {services.map((service) => (
            <li key={service}>
              <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
                {service}
              </Link>
            </li>
          ))}
        </Box>
      </Grid>

      {/* Contact Links */}
      <Grid item xs={12} sm={2} md={3}>
        <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
          Contact
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
          {contacts.map((contact) => (
            <li key={contact}>
              <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
                {contact}
              </Link>
            </li>
          ))}
        </Box>
      </Grid>

      {/* Contact Info */}
      <Grid item xs={12} sm={2} md={3}>
        <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
          Contact Info
        </Typography>
        <Typography variant="body1">
          Mobile: <Link href="tel:+917897424250" color="inherit" underline="none" sx={{ '&:hover': { color: '#00aaff' } }}>+91 78974 24250</Link>
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Email: <Link href="mailto:farmeasy@gmail.com" color="inherit" underline="none" sx={{ '&:hover': { color: '#00aaff' } }}>farmeasy@gmail.com</Link>
        </Typography>
      </Grid>

      {/* Newsletter */}
      <Grid item xs={12} sm={2} md={3}>
        <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
          Newsletter
        </Typography>
        <form>
          <input
            type="email"
            placeholder="Your email"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '20px',
              border: '2px solid #00aaff',
              marginBottom: '12px',
              backgroundColor: '#ffffff',
              color: '#000',
            }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              mt: 1,
              backgroundColor: '#00aaff',
              fontWeight: '600',
              color: '#fff',
              borderRadius: '20px',
              '&:hover': { backgroundColor: '#007acc' },
            }}
          >
            Subscribe
          </Button>
        </form>
      </Grid>
      {/* Social Media Icons */}
      <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
        {socialMedia.map((media) => (
          <IconButton key={media.label} href={media.href} aria-label={media.label} sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
            {media.icon}
          </IconButton>
        ))}
      </Grid>
    </Grid>
    <hr style={{ borderColor: '#00aaff', opacity: 0.5, marginTop: '1.5rem' }} />
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="body2" sx={{ color: '#ffffff' }}>
        &copy; 2024 farmeasy. All rights reserved.
      </Typography>
    </Box>
  </Box>
);

export default Footer;
