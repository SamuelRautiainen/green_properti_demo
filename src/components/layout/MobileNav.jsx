import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Inventory2 as InventoryIcon,
} from '@mui/icons-material';

const navItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon },
  { path: '/kiinteistot', label: 'Kiinteistöt', icon: BusinessIcon },
  { path: '/projektit', label: 'Projektit', icon: AssignmentIcon },
  { path: '/varasto', label: 'Varasto', icon: InventoryIcon },
];

function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentValue = () => {
    const currentPath = location.pathname;
    const index = navItems.findIndex(
      item => currentPath === item.path || 
        (item.path !== '/' && currentPath.startsWith(item.path))
    );
    return index >= 0 ? index : 0;
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        borderTop: '1px solid rgba(74, 124, 89, 0.2)',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={getCurrentValue()}
        onChange={(event, newValue) => {
          navigate(navItems[newValue].path);
        }}
        sx={{
          backgroundColor: '#0D2818',
          height: 70,
          '& .MuiBottomNavigationAction-root': {
            color: '#B8D4C0',
            minWidth: 'auto',
            padding: '6px 12px',
            '&.Mui-selected': {
              color: '#7FBF8E',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.7rem',
            '&.Mui-selected': {
              fontSize: '0.75rem',
            },
          },
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={<Icon />}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}

export default MobileNav;


