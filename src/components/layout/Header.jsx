import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Chip,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  FileDownload as ExportIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const pageTitles = {
  '/': 'Portfolio Dashboard',
  '/kiinteistot': 'Kiinteistöt',
  '/projektit': 'Projektit',
  '/varasto': 'Varasto',
  '/varasto/lisaa': 'Lisää varastoon',
};

function Header({ onMenuClick, isMobile }) {
  const location = useLocation();
  const [period, setPeriod] = useState('12');
  
  const getPageTitle = () => {
    // Check for exact match first
    if (pageTitles[location.pathname]) {
      return pageTitles[location.pathname];
    }
    // Check for dynamic routes
    if (location.pathname.startsWith('/kiinteistot/')) {
      return 'Kiinteistön tiedot';
    }
    if (location.pathname.startsWith('/projektit/')) {
      return 'Projektin tiedot';
    }
    return 'GreenProperty';
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: '#0D2818',
        borderBottom: '1px solid rgba(74, 124, 89, 0.2)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Left side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {getPageTitle()}
          </Typography>
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Period selector - only on dashboard */}
          {location.pathname === '/' && !isMobile && (
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                sx={{
                  color: '#FFFFFF',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(74, 124, 89, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4A7C59',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#B8D4C0',
                  },
                }}
              >
                <MenuItem value="3">Viimeiset 3 kk</MenuItem>
                <MenuItem value="6">Viimeiset 6 kk</MenuItem>
                <MenuItem value="12">Viimeiset 12 kk</MenuItem>
                <MenuItem value="24">Viimeiset 24 kk</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Export button - only on dashboard */}
          {location.pathname === '/' && !isMobile && (
            <Chip
              icon={<ExportIcon sx={{ color: '#FFFFFF !important' }} />}
              label="Vie raportti"
              onClick={() => {}}
              sx={{
                backgroundColor: '#2D5A3D',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#4A7C59',
                },
              }}
            />
          )}

          {/* Notifications */}
          <IconButton sx={{ color: '#B8D4C0' }}>
            <NotificationsIcon />
          </IconButton>

          {/* User avatar */}
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: '#2D5A3D',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            SR
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;


