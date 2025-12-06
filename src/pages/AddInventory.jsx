import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  ExpandMore as ExpandIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import inventoryData from '../mock/inventory.json';
import propertiesData from '../mock/properties.json';

const steps = ['Perustiedot', 'Tekniset tiedot', 'Määrä ja vahvistus'];

function AddInventory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyId: '',
    category: 'door',
    subtype: '',
    widthMm: '',
    heightMm: '',
    frameDepthMm: '',
    rwClass: '',
    color: '',
    doorKind: 'solid',
    handing: 'right',
    quantity: 1,
  });
  const [expandedAccordion, setExpandedAccordion] = useState('door');
  const [submitted, setSubmitted] = useState(false);

  const { categories, doorTypes, glassTypes, solidTypes, partitionTypes, rwClasses, frameDepths, colors, handings } = inventoryData;
  const { properties } = propertiesData;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      // Submit
      setSubmitted(true);
      setTimeout(() => navigate('/varasto'), 2000);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    } else {
      navigate('/varasto');
    }
  };

  const getSubtypeOptions = () => {
    switch (formData.category) {
      case 'door': return doorTypes;
      case 'glass': return glassTypes;
      case 'solid': return solidTypes;
      case 'partition': return partitionTypes;
      default: return [];
    }
  };

  const getCategoryLabel = (cat) => {
    const category = categories.find(c => c.id === cat);
    return category ? category.label : cat;
  };

  if (submitted) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <CheckIcon sx={{ fontSize: 64, color: '#4ADE80', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
          Tuote lisätty varastoon!
        </Typography>
        <Typography sx={{ color: '#B8D4C0' }}>
          Siirrytään varastonäkymään...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Back button */}
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/varasto')}
        sx={{ mb: 2, color: '#B8D4C0' }}
      >
        Takaisin varastoon
      </Button>

      {/* Stepper */}
      <Card sx={{ mb: 3, backgroundColor: '#122A1C' }}>
        <CardContent sx={{ py: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel={isMobile}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: '#B8D4C0',
                      '&.Mui-active': { color: '#FFFFFF' },
                      '&.Mui-completed': { color: '#4ADE80' },
                    },
                    '& .MuiStepIcon-root': {
                      color: 'rgba(74, 124, 89, 0.3)',
                      '&.Mui-active': { color: '#4A7C59' },
                      '&.Mui-completed': { color: '#4ADE80' },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card sx={{ backgroundColor: '#122A1C' }}>
        <CardContent sx={{ p: 3 }}>
          {/* Step 1: Basic Info */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3 }}>
                Perustiedot
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Kiinteistö</InputLabel>
                    <Select
                      value={formData.propertyId}
                      label="Kiinteistö"
                      onChange={(e) => handleChange('propertyId', e.target.value)}
                    >
                      {properties.map((prop) => (
                        <MenuItem key={prop.id} value={prop.id}>{prop.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: '#B8D4C0', mb: 1 }}>
                    Kategoria
                  </Typography>
                  <ToggleButtonGroup
                    value={formData.category}
                    exclusive
                    onChange={(e, value) => value && handleChange('category', value)}
                    sx={{ flexWrap: 'wrap', gap: 1 }}
                  >
                    {categories.map((cat) => (
                      <ToggleButton
                        key={cat.id}
                        value={cat.id}
                        sx={{
                          color: '#B8D4C0',
                          borderColor: 'rgba(74, 124, 89, 0.3)',
                          '&.Mui-selected': {
                            backgroundColor: '#2D5A3D',
                            color: '#FFFFFF',
                            '&:hover': { backgroundColor: '#4A7C59' },
                          },
                        }}
                      >
                        {cat.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Tyyppi</InputLabel>
                    <Select
                      value={formData.subtype}
                      label="Tyyppi"
                      onChange={(e) => handleChange('subtype', e.target.value)}
                    >
                      {getSubtypeOptions().map((type) => (
                        <MenuItem key={type.id} value={type.id}>{type.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 2: Technical specs */}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3 }}>
                Tekniset tiedot - {getCategoryLabel(formData.category)}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Leveys (mm)"
                    type="number"
                    value={formData.widthMm}
                    onChange={(e) => handleChange('widthMm', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Korkeus (mm)"
                    type="number"
                    value={formData.heightMm}
                    onChange={(e) => handleChange('heightMm', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Karmisyvyys</InputLabel>
                    <Select
                      value={formData.frameDepthMm}
                      label="Karmisyvyys"
                      onChange={(e) => handleChange('frameDepthMm', e.target.value)}
                    >
                      {frameDepths.map((depth) => (
                        <MenuItem key={depth} value={depth}>{depth} mm</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Väri</InputLabel>
                    <Select
                      value={formData.color}
                      label="Väri"
                      onChange={(e) => handleChange('color', e.target.value)}
                    >
                      {colors.map((color) => (
                        <MenuItem key={color} value={color}>{color}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {(formData.category === 'door' || formData.category === 'glass') && (
                  <Grid item xs={6} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Äänieristys</InputLabel>
                      <Select
                        value={formData.rwClass}
                        label="Äänieristys"
                        onChange={(e) => handleChange('rwClass', e.target.value)}
                      >
                        {rwClasses.map((rw) => (
                          <MenuItem key={rw} value={rw}>{rw} dB</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {formData.category === 'door' && (
                  <>
                    <Grid item xs={6} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Ovityyppi</InputLabel>
                        <Select
                          value={formData.doorKind}
                          label="Ovityyppi"
                          onChange={(e) => handleChange('doorKind', e.target.value)}
                        >
                          <MenuItem value="solid">Umpiovi</MenuItem>
                          <MenuItem value="with_glass">Lasiovi</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Kätisyys</InputLabel>
                        <Select
                          value={formData.handing}
                          label="Kätisyys"
                          onChange={(e) => handleChange('handing', e.target.value)}
                        >
                          {handings.map((h) => (
                            <MenuItem key={h.id} value={h.id}>{h.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          )}

          {/* Step 3: Quantity and confirmation */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3 }}>
                Määrä ja vahvistus
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Määrä (kpl)"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: 'rgba(74, 124, 89, 0.2)' }} />

              {/* Summary */}
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
                Yhteenveto
              </Typography>
              
              <Card sx={{ backgroundColor: 'rgba(74, 124, 89, 0.1)', p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Kiinteistö</Typography>
                    <Typography sx={{ color: '#FFFFFF' }}>
                      {properties.find(p => p.id === formData.propertyId)?.name || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Kategoria</Typography>
                    <Typography sx={{ color: '#FFFFFF' }}>
                      {getCategoryLabel(formData.category)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Tyyppi</Typography>
                    <Typography sx={{ color: '#FFFFFF' }}>
                      {formData.subtype || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Mitat</Typography>
                    <Typography sx={{ color: '#FFFFFF' }}>
                      {formData.widthMm && formData.heightMm 
                        ? `${formData.widthMm} × ${formData.heightMm} mm` 
                        : '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Väri</Typography>
                    <Typography sx={{ color: '#FFFFFF' }}>
                      {formData.color || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#B8D4C0' }}>Määrä</Typography>
                    <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                      {formData.quantity} kpl
                    </Typography>
                  </Grid>
                </Grid>
              </Card>

              <Alert 
                severity="info" 
                sx={{ 
                  mt: 3,
                  backgroundColor: 'rgba(74, 124, 89, 0.2)',
                  color: '#FFFFFF',
                  '& .MuiAlert-icon': { color: '#7FBF8E' },
                }}
              >
                Arvioitu CO₂ säästö: ~{formData.quantity * 25} kg
              </Alert>
            </Box>
          )}

          {/* Navigation buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              sx={{ color: '#B8D4C0' }}
            >
              {activeStep === 0 ? 'Peruuta' : 'Takaisin'}
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: '#2D5A3D',
                '&:hover': { backgroundColor: '#4A7C59' },
              }}
            >
              {activeStep === steps.length - 1 ? 'Lisää varastoon' : 'Seuraava'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddInventory;


