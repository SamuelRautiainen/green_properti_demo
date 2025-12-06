import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  PlayArrow as ActionIcon,
  Lightbulb as SuggestionIcon,
} from '@mui/icons-material';

function ActionsList({ actions }) {
  const getIcon = (type) => {
    switch (type) {
      case 'suggestion':
        return <SuggestionIcon sx={{ color: '#FBBF24' }} />;
      default:
        return <ActionIcon sx={{ color: '#7FBF8E' }} />;
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
          Toimenpiteet
        </Typography>
        
        <List disablePadding>
          {actions.map((action) => (
            <ListItem
              key={action.id}
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
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {getIcon(action.type)}
              </ListItemIcon>
              <ListItemText
                primary={action.text}
                primaryTypographyProps={{
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default ActionsList;


