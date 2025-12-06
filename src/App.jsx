import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Inventory from './pages/Inventory';
import AddInventory from './pages/AddInventory';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kiinteistot" element={<Properties />} />
          <Route path="/kiinteistot/:id" element={<PropertyDetail />} />
          <Route path="/projektit" element={<Projects />} />
          <Route path="/projektit/:id" element={<ProjectDetail />} />
          <Route path="/varasto" element={<Inventory />} />
          <Route path="/varasto/lisaa" element={<AddInventory />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;


