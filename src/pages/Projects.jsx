import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ChevronRight as ChevronIcon,
  CalendarMonth as CalendarIcon,
  Co2 as CO2Icon,
} from '@mui/icons-material';
import projectsData from '../mock/projects.json';

function ProjectCard({ project, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: 'rgba(74, 222, 128, 0.2)', color: '#4ADE80', label: 'Käynnissä' };
      case 'planning': return { bg: 'rgba(251, 191, 36, 0.2)', color: '#FBBF24', label: 'Suunnitteilla' };
      case 'completed': return { bg: 'rgba(74, 124, 89, 0.2)', color: '#7FBF8E', label: 'Valmis' };
      default: return { bg: 'rgba(184, 212, 192, 0.2)', color: '#B8D4C0', label: status };
    }
  };

  const status = getStatusColor(project.status);

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#FFFFFF', mb: 0.5 }}>
              {project.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#B8D4C0' }}>
              {project.propertyName}
            </Typography>
          </Box>
          <Chip
            label={status.label}
            size="small"
            sx={{ backgroundColor: status.bg, color: status.color }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CO2Icon sx={{ fontSize: 16, color: '#7FBF8E' }} />
            <Typography variant="body2" sx={{ color: '#B8D4C0' }}>
              {project.demolitionCO2} kg
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarIcon sx={{ fontSize: 16, color: '#7FBF8E' }} />
            <Typography variant="body2" sx={{ color: '#B8D4C0' }}>
              {new Date(project.estimatedCompletion).toLocaleDateString('fi-FI')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
              Uudelleenkäyttö
            </Typography>
            <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 600 }}>
              {project.reusePercentage}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project.reusePercentage}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
            Jätekustannukset: {new Intl.NumberFormat('fi-FI').format(project.wasteCost)} €
          </Typography>
          <ChevronIcon sx={{ color: '#B8D4C0' }} />
        </Box>
      </CardContent>
    </Card>
  );
}

function Projects() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { projects } = projectsData;

  const activeProjects = projects.filter(p => p.status === 'active');
  const planningProjects = projects.filter(p => p.status === 'planning');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <Box>
      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#FFFFFF' }}>
            Käynnissä olevat projektit ({activeProjects.length})
          </Typography>
          <Grid container spacing={2}>
            {activeProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={() => navigate(`/projektit/${project.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Planning Projects */}
      {planningProjects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#FFFFFF' }}>
            Suunnitteilla ({planningProjects.length})
          </Typography>
          <Grid container spacing={2}>
            {planningProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={() => navigate(`/projektit/${project.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#FFFFFF' }}>
            Valmiit ({completedProjects.length})
          </Typography>
          <Grid container spacing={2}>
            {completedProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={() => navigate(`/projektit/${project.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Projects;


