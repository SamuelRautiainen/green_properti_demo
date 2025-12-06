import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import {
  ChevronRight as ChevronIcon,
  LocationOn as LocationIcon,
  Co2 as CO2Icon,
  Recycling as RecyclingIcon,
} from '@mui/icons-material';
import propertiesData from '../mock/properties.json';

function PropertyCard({ property, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          borderColor: '#4A7C59',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
            {property.name}
          </Typography>
          <ChevronIcon sx={{ color: '#B8D4C0' }} />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <LocationIcon sx={{ fontSize: 16, color: '#7FBF8E' }} />
          <Typography variant="body2" sx={{ color: '#B8D4C0' }}>
            {property.location}
          </Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(74, 124, 89, 0.1)', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Remonttikustannukset
              </Typography>
              <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                {new Intl.NumberFormat('fi-FI').format(property.renovationCost)} €
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(74, 124, 89, 0.1)', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Uudelleenkäyttö
              </Typography>
              <Typography variant="body1" sx={{ color: '#4ADE80', fontWeight: 600 }}>
                {property.reusePercentage} %
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(74, 124, 89, 0.1)', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Hiilijalanjälki
              </Typography>
              <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                {property.co2Footprint} t CO₂
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(74, 124, 89, 0.1)', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Projekteja
              </Typography>
              <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                {property.activeProjects}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Properties() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { properties } = propertiesData;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fi-FI').format(value) + ' €';
  };

  // Mobile view - cards
  if (isMobile) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#FFFFFF' }}>
          Yhteenveto
        </Typography>
        <Grid container spacing={2}>
          {properties.map((property) => (
            <Grid item xs={12} key={property.id}>
              <PropertyCard
                property={property}
                onClick={() => navigate(`/kiinteistot/${property.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Desktop view - table
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#FFFFFF' }}>
        Yhteenveto
      </Typography>
      
      <Card sx={{ backgroundColor: '#122A1C' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kiinteistö</TableCell>
                <TableCell>Sijainti</TableCell>
                <TableCell align="right">Remonttikustannukset</TableCell>
                <TableCell align="right">Uudelleenkäyttö</TableCell>
                <TableCell align="right">Hiilijalanjälki</TableCell>
                <TableCell align="right">Projekteja</TableCell>
                <TableCell width={50}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property) => (
                <TableRow
                  key={property.id}
                  hover
                  onClick={() => navigate(`/kiinteistot/${property.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Typography sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                      {property.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: '#B8D4C0' }}>
                      {property.location}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: '#FFFFFF' }}>
                      {formatCurrency(property.renovationCost)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${property.reusePercentage}%`}
                      size="small"
                      sx={{
                        backgroundColor: property.reusePercentage >= 50 
                          ? 'rgba(74, 222, 128, 0.2)' 
                          : 'rgba(251, 191, 36, 0.2)',
                        color: property.reusePercentage >= 50 
                          ? '#4ADE80' 
                          : '#FBBF24',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: '#FFFFFF' }}>
                      {property.co2Footprint} t CO₂
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={property.activeProjects}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(74, 124, 89, 0.2)',
                        color: '#7FBF8E',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{ color: '#B8D4C0' }}>
                      <ChevronIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default Properties;


