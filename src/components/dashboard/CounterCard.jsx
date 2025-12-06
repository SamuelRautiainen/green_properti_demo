import { Card, CardContent, Typography, Box } from '@mui/material';

function CounterCard({ label, value, highlight = false }) {
  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: highlight ? '#1A3D28' : '#122A1C',
        border: highlight 
          ? '1px solid #4A7C59' 
          : '1px solid rgba(74, 124, 89, 0.2)',
      }}
    >
      <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            color: '#FFFFFF',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            lineHeight: 1,
            mb: 1,
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: highlight ? '#7FBF8E' : '#B8D4C0',
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CounterCard;


