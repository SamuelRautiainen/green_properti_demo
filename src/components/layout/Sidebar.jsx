import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Inventory2 as InventoryIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon },
  { path: '/kiinteistot', label: 'Kiinteistöt', icon: BusinessIcon },
  { path: '/projektit', label: 'Projektit', icon: AssignmentIcon },
  { path: '/varasto', label: 'Varasto', icon: InventoryIcon },
];

function Logo() {
  return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#1A3D28',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #4A7C59',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#FFFFFF',
          }}
        >
          GP
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.2,
          }}
        >
          GreenProperty
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: '#7FBF8E', fontSize: '0.7rem' }}
        >
          Low-carbon fitout
        </Typography>
      </Box>
    </Box>
  );
}

function Sidebar({ width, variant = 'permanent', open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Logo />
      
      <Divider sx={{ borderColor: 'rgba(74, 124, 89, 0.2)' }} />
      
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'rgba(74, 124, 89, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive 
                      ? 'rgba(74, 124, 89, 0.3)' 
                      : 'rgba(74, 124, 89, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon sx={{ color: isActive ? '#7FBF8E' : '#B8D4C0' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#FFFFFF' : '#B8D4C0',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Quick action button */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => handleNavigation('/varasto/lisaa')}
          sx={{
            borderRadius: 2,
            backgroundColor: '#2D5A3D',
            '&:hover': {
              backgroundColor: '#4A7C59',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <AddIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Lisää varastoon"
            primaryTypographyProps={{
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={variant === 'permanent' ? true : open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          backgroundColor: '#0D2818',
          borderRight: '1px solid rgba(74, 124, 89, 0.2)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;


