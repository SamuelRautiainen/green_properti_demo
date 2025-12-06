import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  Box,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
} from '@mui/icons-material';

function AlertsPanel({ alerts }) {
  const getAlertStyle = (type) => {
    switch (type) {
      case 'error':
        return {
          icon: ErrorIcon,
          color: '#F87171',
          bgColor: 'rgba(248, 113, 113, 0.1)',
        };
      case 'warning':
        return {
          icon: WarningIcon,
          color: '#FBBF24',
          bgColor: 'rgba(251, 191, 36, 0.1)',
        };
      case 'success':
        return {
          icon: SuccessIcon,
          color: '#4ADE80',
          bgColor: 'rgba(74, 222, 128, 0.1)',
        };
      default:
        return {
          icon: WarningIcon,
          color: '#B8D4C0',
          bgColor: 'rgba(184, 212, 192, 0.1)',
        };
    }
  };

  return (
    <Card sx={{ height: '100%', backgroundColor: '#122A1C' }}>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            color: '#FFFFFF',
            mb: 2,
          }}
        >
          Hälytykset & oivallukset
        </Typography>
        
        <List disablePadding>
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            const Icon = style.icon;
            
            return (
              <ListItem
                key={alert.id}
                sx={{
                  px: 2,
                  py: 1.5,
                  mb: 1,
                  backgroundColor: style.bgColor,
                  borderRadius: 2,
                  borderLeft: `3px solid ${style.color}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Icon sx={{ color: style.color, fontSize: 20, mt: 0.25 }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {alert.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#B8D4C0' }}
                    >
                      {alert.description}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

export default AlertsPanel;


