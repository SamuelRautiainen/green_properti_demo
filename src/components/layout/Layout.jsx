import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

const DRAWER_WIDTH = 260;

function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      {/* Sidebar - hidden on mobile */}
      {!isMobile && <Sidebar width={DRAWER_WIDTH} />}
      
      {/* Mobile drawer */}
      {isMobile && (
        <Sidebar 
          width={DRAWER_WIDTH} 
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />
      )}

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
        }}
      >
        {/* Header */}
        <Header onMenuClick={handleDrawerToggle} isMobile={isMobile} />
        
        {/* Page content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            pb: { xs: 10, md: 3 },
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Mobile bottom navigation */}
      {isMobile && <MobileNav />}
    </Box>
  );
}

export default Layout;


