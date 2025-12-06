import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Recycling as RecyclingIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import inventoryData from '../mock/inventory.json';
import propertiesData from '../mock/properties.json';

function SummaryCard({ title, count, subtitle, highlight = false }) {
  return (
    <Card
      sx={{
        backgroundColor: '#122A1C',
        border: highlight ? '2px solid #4A7C59' : '1px solid rgba(74, 124, 89, 0.2)',
      }}
    >
      <CardContent sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: '#B8D4C0', textTransform: 'uppercase' }}>
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontFamily: '"DM Sans"', fontWeight: 700, color: '#FFFFFF', my: 0.5 }}
        >
          {count}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: '#7FBF8E' }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function InventoryCard({ item, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        '&:hover': { borderColor: '#4A7C59' },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
            {item.subtype}
          </Typography>
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
        </Box>
        
        <Typography variant="body2" sx={{ color: '#B8D4C0', mb: 1 }}>
          {item.propertyName}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
              {item.widthMm} × {item.heightMm} mm
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
              {item.quantity} kpl
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <RecyclingIcon sx={{ fontSize: 16, color: '#4ADE80' }} />
            <Typography variant="body2" sx={{ color: '#4ADE80', fontWeight: 600 }}>
              {item.co2Savings} kg
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function Inventory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [propertyFilter, setPropertyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { items, summary, categories } = inventoryData;
  const { properties } = propertiesData;

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesProperty = propertyFilter === 'all' || item.propertyId === propertyFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      item.subtype.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProperty && matchesCategory && matchesSearch;
  });

  // Calculate totals
  const totalCO2Savings = filteredItems.reduce((sum, item) => sum + item.co2Savings, 0);
  const totalItems = filteredItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCategoryLabel = (cat) => {
    const category = categories.find(c => c.id === cat);
    return category ? category.label : cat;
  };

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Lasiseinät" count={summary.glassPartitions.count} subtitle={summary.glassPartitions.size} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Umpielementit" count={summary.solidPartitions.count} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Umpiovet" count={summary.solidDoors.count} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Lasiovet" count={summary.glazedDoors.count} />
        </Grid>
      </Grid>

      {/* Filters and Actions */}
      <Card sx={{ mb: 3, backgroundColor: '#122A1C' }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Hae..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#B8D4C0' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Kiinteistö</InputLabel>
                <Select
                  value={propertyFilter}
                  label="Kiinteistö"
                  onChange={(e) => setPropertyFilter(e.target.value)}
                >
                  <MenuItem value="all">Kaikki kiinteistöt</MenuItem>
                  {properties.map((prop) => (
                    <MenuItem key={prop.id} value={prop.id}>{prop.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Tyyppi</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Tyyppi"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">Kaikki tyypit</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2 }}>
                <RecyclingIcon sx={{ color: '#4ADE80' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#B8D4C0' }}>CO₂ säästöt</Typography>
                  <Typography variant="h6" sx={{ color: '#4ADE80', fontWeight: 700, lineHeight: 1 }}>
                    {totalCO2Savings} kg
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/varasto/lisaa')}
                sx={{
                  backgroundColor: '#2D5A3D',
                  '&:hover': { backgroundColor: '#4A7C59' },
                }}
              >
                Lisää varastoon
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Inventory List */}
      {isMobile ? (
        // Mobile - Cards view
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <InventoryCard item={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Desktop - Table view
        <Card sx={{ backgroundColor: '#122A1C' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Kiinteistö</TableCell>
                  <TableCell>Tyyppi</TableCell>
                  <TableCell>Kuvaus</TableCell>
                  <TableCell>Mitat</TableCell>
                  <TableCell align="right">Määrä</TableCell>
                  <TableCell align="right">CO₂ säästö</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                        {item.propertyName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getCategoryLabel(item.category)}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(74, 124, 89, 0.2)',
                          color: '#7FBF8E',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: '#FFFFFF' }}>{item.subtype}</Typography>
                      <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: '#B8D4C0' }}>
                      {item.widthMm} × {item.heightMm} mm
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ color: '#4ADE80', fontWeight: 600 }}>
                        {item.co2Savings} kg
                      </Typography>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        sx={{ color: '#7FBF8E' }}
                      >
                        Lisää projektiin
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {filteredItems.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ color: '#B8D4C0' }}>
            Ei tuloksia annetuilla hakuehdoilla
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Inventory;


