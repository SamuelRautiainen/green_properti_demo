import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  LocationOn as LocationIcon,
  Layers as FloorsIcon,
  SquareFoot as AreaIcon,
  Assignment as ProjectIcon,
  Inventory2 as InventoryIcon,
  ChevronRight as ChevronIcon,
} from '@mui/icons-material';
import propertiesData from '../mock/properties.json';
import projectsData from '../mock/projects.json';
import inventoryData from '../mock/inventory.json';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const property = propertiesData.properties.find(p => p.id === id);
  const propertyProjects = projectsData.projects.filter(p => p.propertyId === id);
  const propertyInventory = inventoryData.items.filter(i => i.propertyId === id);

  if (!property) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" sx={{ color: '#B8D4C0' }}>
          Kiinteistöä ei löytynyt
        </Typography>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/kiinteistot')}
          sx={{ mt: 2 }}
        >
          Takaisin
        </Button>
      </Box>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fi-FI').format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: 'rgba(74, 222, 128, 0.2)', color: '#4ADE80' };
      case 'planning': return { bg: 'rgba(251, 191, 36, 0.2)', color: '#FBBF24' };
      case 'completed': return { bg: 'rgba(74, 124, 89, 0.2)', color: '#7FBF8E' };
      default: return { bg: 'rgba(184, 212, 192, 0.2)', color: '#B8D4C0' };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Käynnissä';
      case 'planning': return 'Suunnitteilla';
      case 'completed': return 'Valmis';
      default: return status;
    }
  };

  return (
    <Box>
      {/* Back button */}
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/kiinteistot')}
        sx={{ mb: 2, color: '#B8D4C0' }}
      >
        Takaisin kiinteistöihin
      </Button>

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 1 }}>
          {property.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationIcon sx={{ fontSize: 18, color: '#7FBF8E' }} />
          <Typography sx={{ color: '#B8D4C0' }}>
            {property.address}
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <FloorsIcon sx={{ color: '#7FBF8E', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                {property.floors}
              </Typography>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Kerroksia
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <AreaIcon sx={{ color: '#7FBF8E', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                {formatCurrency(property.totalArea)}
              </Typography>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                m² pinta-ala
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#4ADE80' }}>
                {property.reusePercentage}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Uudelleenkäyttö
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                {property.co2Footprint}
              </Typography>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                t CO₂
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                {formatCurrency(property.renovationCost)}
              </Typography>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                € kustannukset
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                {property.occupancyRate}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Käyttöaste
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Projects */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                  <ProjectIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#7FBF8E' }} />
                  Projektit ({propertyProjects.length})
                </Typography>
              </Box>
              
              {propertyProjects.length > 0 ? (
                <List disablePadding>
                  {propertyProjects.map((project) => {
                    const statusStyle = getStatusColor(project.status);
                    return (
                      <ListItem
                        key={project.id}
                        sx={{
                          px: 2,
                          py: 1.5,
                          mb: 1,
                          backgroundColor: 'rgba(74, 124, 89, 0.1)',
                          borderRadius: 2,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'rgba(74, 124, 89, 0.2)',
                          },
                        }}
                        onClick={() => navigate(`/projektit/${project.id}`)}
                        secondaryAction={
                          <IconButton edge="end" sx={{ color: '#B8D4C0' }}>
                            <ChevronIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={project.name}
                          secondary={`${project.demolitionCO2} kg CO₂ | ${formatCurrency(project.wasteCost)} €`}
                          primaryTypographyProps={{ color: '#FFFFFF', fontWeight: 500 }}
                          secondaryTypographyProps={{ color: '#B8D4C0' }}
                        />
                        <Chip
                          label={getStatusLabel(project.status)}
                          size="small"
                          sx={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            mr: 2,
                          }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Typography sx={{ color: '#B8D4C0', textAlign: 'center', py: 4 }}>
                  Ei projekteja
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#122A1C', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                  <InventoryIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#7FBF8E' }} />
                  Varasto ({propertyInventory.length})
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate('/varasto')}
                  sx={{ color: '#7FBF8E' }}
                >
                  Näytä kaikki
                </Button>
              </Box>
              
              {propertyInventory.length > 0 ? (
                <List disablePadding>
                  {propertyInventory.slice(0, 5).map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        px: 2,
                        py: 1.5,
                        mb: 1,
                        backgroundColor: 'rgba(74, 124, 89, 0.1)',
                        borderRadius: 2,
                      }}
                    >
                      <ListItemText
                        primary={`${item.subtype} - ${item.quantity} kpl`}
                        secondary={`${item.widthMm} x ${item.heightMm} mm | ${item.co2Savings} kg CO₂ säästö`}
                        primaryTypographyProps={{ color: '#FFFFFF', fontWeight: 500 }}
                        secondaryTypographyProps={{ color: '#B8D4C0' }}
                      />
                      <Chip
                        label={item.status === 'available' ? 'Vapaa' : 'Varattu'}
                        size="small"
                        sx={{
                          backgroundColor: item.status === 'available'
                            ? 'rgba(74, 222, 128, 0.2)'
                            : 'rgba(251, 191, 36, 0.2)',
                          color: item.status === 'available' ? '#4ADE80' : '#FBBF24',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography sx={{ color: '#B8D4C0', textAlign: 'center', py: 4 }}>
                  Ei varastotuotteita
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PropertyDetail;


