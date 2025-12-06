import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  CalendarMonth as CalendarIcon,
  Recycling as RecyclingIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import projectsData from '../mock/projects.json';
import inventoryData from '../mock/inventory.json';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('current');
  
  const project = projectsData.projects.find(p => p.id === id);
  const matchingInventory = inventoryData.items.filter(i => 
    i.status === 'available' && 
    project?.elements.some(e => {
      // Simple matching logic
      const widthMatch = Math.abs(i.widthMm - e.widthMm) <= 50;
      const heightMatch = Math.abs(i.heightMm - e.heightMm) <= 50;
      return widthMatch && heightMatch;
    })
  );

  if (!project) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" sx={{ color: '#B8D4C0' }}>
          Projektia ei löytynyt
        </Typography>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/projektit')}
          sx={{ mt: 2 }}
        >
          Takaisin
        </Button>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: 'rgba(74, 222, 128, 0.2)', color: '#4ADE80', label: 'Käynnissä' };
      case 'planning': return { bg: 'rgba(251, 191, 36, 0.2)', color: '#FBBF24', label: 'Suunnitteilla' };
      case 'completed': return { bg: 'rgba(74, 124, 89, 0.2)', color: '#7FBF8E', label: 'Valmis' };
      default: return { bg: 'rgba(184, 212, 192, 0.2)', color: '#B8D4C0', label: status };
    }
  };

  const getElementStatusStyle = (status) => {
    switch (status) {
      case 'demolish': return { bg: 'rgba(248, 113, 113, 0.2)', color: '#F87171', label: 'Purettava' };
      case 'reuse': return { bg: 'rgba(74, 222, 128, 0.2)', color: '#4ADE80', label: 'Uudelleenkäyttö' };
      case 'keep': return { bg: 'rgba(184, 212, 192, 0.2)', color: '#B8D4C0', label: 'Säilytetään' };
      default: return { bg: 'rgba(184, 212, 192, 0.2)', color: '#B8D4C0', label: status };
    }
  };

  const statusStyle = getStatusColor(project.status);
  const formatCurrency = (value) => new Intl.NumberFormat('fi-FI').format(value);

  return (
    <Box>
      {/* Back button */}
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/projektit')}
        sx={{ mb: 2, color: '#B8D4C0' }}
      >
        Takaisin projekteihin
      </Button>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
              {project.name}
            </Typography>
            <Chip
              label={statusStyle.label}
              sx={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
            />
          </Box>
          <Typography sx={{ color: '#B8D4C0' }}>
            {project.propertyName} • {project.floor}. kerros {project.wing && `• Wing ${project.wing}`}
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newValue) => newValue && setViewMode(newValue)}
          size="small"
        >
          <ToggleButton value="current" sx={{ color: '#FFFFFF' }}>
            Nykytila
          </ToggleButton>
          <ToggleButton value="planned" sx={{ color: '#FFFFFF' }}>
            Suunniteltu
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Left side - Floor plan placeholder & metrics */}
        <Grid item xs={12} md={7}>
          {/* Floor plan placeholder */}
          <Card sx={{ mb: 2, backgroundColor: '#122A1C' }}>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  height: 350,
                  backgroundColor: '#1A3D28',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  border: '2px dashed rgba(74, 124, 89, 0.3)',
                  position: 'relative',
                }}
              >
                {/* Simplified floor plan visualization */}
                <Box
                  sx={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: '#F5F5DC',
                    borderRadius: 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Rooms */}
                  <Box sx={{ position: 'absolute', top: '10%', left: '10%', width: '35%', height: '40%', backgroundColor: viewMode === 'planned' ? 'rgba(74, 222, 128, 0.3)' : '#E5E5E5', border: '2px solid #999' }} />
                  <Box sx={{ position: 'absolute', top: '10%', right: '10%', width: '35%', height: '40%', backgroundColor: '#E5E5E5', border: '2px solid #999' }} />
                  <Box sx={{ position: 'absolute', bottom: '10%', left: '10%', width: '80%', height: '35%', backgroundColor: viewMode === 'planned' ? 'rgba(248, 113, 113, 0.3)' : '#E5E5E5', border: '2px solid #999' }} />
                </Box>
                
                {/* Legend */}
                <Box sx={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 12, height: 12, backgroundColor: 'rgba(74, 222, 128, 0.5)', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Uudelleenkäyttö</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 12, height: 12, backgroundColor: 'rgba(248, 113, 113, 0.5)', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Purettava</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Metrics */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: '#122A1C' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                    {formatCurrency(project.demolitionCO2)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                    kg CO₂ purkamisesta
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: '#122A1C' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                    {formatCurrency(project.wasteCost)} €
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                    Jätekustannukset
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: '#122A1C' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#4ADE80' }}>
                    {project.reusePercentage}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                    Uudelleenkäyttö
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ backgroundColor: '#122A1C' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <CalendarIcon sx={{ color: '#7FBF8E', mb: 0.5 }} />
                  <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                    {new Date(project.estimatedCompletion).toLocaleDateString('fi-FI')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                    Valmistuminen
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right side - Elements & Matching inventory */}
        <Grid item xs={12} md={5}>
          {/* Elements list */}
          <Card sx={{ mb: 2, backgroundColor: '#122A1C' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#FFFFFF', mb: 2 }}>
                Elementit ({project.elements.length})
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tyyppi</TableCell>
                      <TableCell>Mitat</TableCell>
                      <TableCell align="right">Kpl</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project.elements.map((element) => {
                      const elStatus = getElementStatusStyle(element.status);
                      return (
                        <TableRow key={element.id}>
                          <TableCell sx={{ color: '#FFFFFF' }}>{element.type}</TableCell>
                          <TableCell sx={{ color: '#B8D4C0' }}>
                            {element.widthMm} × {element.heightMm}
                          </TableCell>
                          <TableCell align="right" sx={{ color: '#FFFFFF' }}>
                            {element.quantity}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={elStatus.label}
                              size="small"
                              sx={{ backgroundColor: elStatus.bg, color: elStatus.color }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Matching inventory */}
          <Card sx={{ backgroundColor: '#122A1C' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <RecyclingIcon sx={{ color: '#4ADE80' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                  Sopivat varastotuotteet
                </Typography>
              </Box>
              
              {matchingInventory.length > 0 ? (
                <Box>
                  {matchingInventory.slice(0, 4).map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        p: 2,
                        mb: 1,
                        backgroundColor: 'rgba(74, 222, 128, 0.1)',
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                          {item.subtype}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                          {item.widthMm} × {item.heightMm} mm • {item.quantity} kpl
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: '#4A7C59',
                          color: '#4ADE80',
                          '&:hover': {
                            borderColor: '#7FBF8E',
                            backgroundColor: 'rgba(74, 124, 89, 0.1)',
                          },
                        }}
                      >
                        Käytä
                      </Button>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography sx={{ color: '#B8D4C0', textAlign: 'center', py: 2 }}>
                  Ei sopivia varastotuotteita
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectDetail;


