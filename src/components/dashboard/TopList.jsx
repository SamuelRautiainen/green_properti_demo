import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  LinearProgress,
} from '@mui/material';

function TopList({ title, items, linkPath }) {
  const navigate = useNavigate();
  
  // Find max value for progress bars
  const maxValue = Math.max(...items.map(item => item.value));

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
          {title}
        </Typography>
        
        <List disablePadding>
          {items.slice(0, 5).map((item, index) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{
                mb: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={() => navigate(`${linkPath}/${item.id}`)}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '60%',
                    }}
                  >
                    {index + 1}. {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#7FBF8E', fontWeight: 600 }}
                  >
                    {item.value} {item.unit}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(item.value / maxValue) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(74, 124, 89, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4A7C59',
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TopList;


