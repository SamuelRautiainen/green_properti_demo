import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Button,
  Grid,
} from '@mui/material';
import {
  Recycling as RecyclingIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';

function InventorySummaryCard({ data }) {
  const navigate = useNavigate();

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fi-FI').format(num);
  };

  return (
    <Card sx={{ height: '100%', backgroundColor: '#122A1C' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Varasto & säästöt
          </Typography>
          <RecyclingIcon sx={{ color: '#4A7C59', fontSize: 28 }} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'rgba(74, 124, 89, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Kokonaispinta-ala
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                {formatNumber(data.totalArea)} m²
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'rgba(74, 124, 89, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
                Arvioitu arvo
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                {formatNumber(data.totalValue)} €
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            p: 2,
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
              CO₂ säästöpotentiaali
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                color: '#4ADE80',
              }}
            >
              {formatNumber(data.co2Potential)} kg
            </Typography>
          </Box>
          <RecyclingIcon sx={{ color: '#4ADE80', fontSize: 48, opacity: 0.5 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/varasto')}
            sx={{
              backgroundColor: '#2D5A3D',
              '&:hover': { backgroundColor: '#4A7C59' },
            }}
          >
            Avaa varasto
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/varasto/lisaa')}
            endIcon={<ArrowIcon />}
            sx={{
              borderColor: '#4A7C59',
              color: '#FFFFFF',
              '&:hover': {
                borderColor: '#7FBF8E',
                backgroundColor: 'rgba(74, 124, 89, 0.1)',
              },
            }}
          >
            Lisää
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default InventorySummaryCard;


