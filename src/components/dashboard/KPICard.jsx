import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

function KPICard({ label, value, unit, trend, isNegativeGood = false, isCurrency = false, subscript }) {
  const formatValue = () => {
    if (isCurrency) {
      return new Intl.NumberFormat('fi-FI').format(value);
    }
    return value;
  };

  const getTrendIcon = () => {
    if (trend === 0 || trend === undefined) return null;
    if (trend > 0) {
      return <TrendingUp sx={{ fontSize: 18 }} />;
    }
    return <TrendingDown sx={{ fontSize: 18 }} />;
  };

  const getTrendColor = () => {
    if (trend === 0 || trend === undefined) return '#B8D4C0';
    const isPositive = trend > 0;
    if (isNegativeGood) {
      return isPositive ? '#F87171' : '#4ADE80';
    }
    return isPositive ? '#4ADE80' : '#F87171';
  };

  // Render label with subscript support for CO₂
  const renderLabel = () => {
    if (subscript && label.includes('CO')) {
      const parts = label.split('CO');
      return (
        <>
          {parts[0]}CO<sub>{subscript}</sub>{parts[1]?.replace('2', '').replace('₂', '')}
        </>
      );
    }
    return label;
  };

  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: '#122A1C',
        border: '1px solid rgba(74, 124, 89, 0.2)',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: '#B8D4C0',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'block',
            mb: 1,
          }}
        >
          {renderLabel()}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              lineHeight: 1,
            }}
          >
            {formatValue()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#B8D4C0',
              fontWeight: 500,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            {unit}
          </Typography>
        </Box>

        {trend !== undefined && trend !== 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mt: 1,
              color: getTrendColor(),
            }}
          >
            {getTrendIcon()}
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {Math.abs(trend)}% vs. edellinen
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default KPICard;


