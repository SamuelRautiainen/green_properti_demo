import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import KPICard from '../components/dashboard/KPICard';
import CounterCard from '../components/dashboard/CounterCard';
import CO2TrendChart from '../components/charts/CO2TrendChart';
import CO2BarChart from '../components/charts/CO2BarChart';
import TopList from '../components/dashboard/TopList';
import ActionsList from '../components/dashboard/ActionsList';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import InventorySummaryCard from '../components/dashboard/InventorySummaryCard';
import dashboardData from '../mock/dashboard.json';

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { kpiCards, counters, co2Trend, co2PerProperty, topProperties, topProjects, actions, inventorySummary, alerts } = dashboardData;

  return (
    <Box>
      {/* KPI Cards Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={6} md={3}>
          <KPICard
            label={kpiCards.co2PerM2.label}
            value={kpiCards.co2PerM2.value}
            unit={kpiCards.co2PerM2.unit}
            trend={kpiCards.co2PerM2.trend}
            subscript="2"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <KPICard
            label={kpiCards.co2Change.label}
            value={kpiCards.co2Change.value}
            unit={kpiCards.co2Change.unit}
            trend={kpiCards.co2Change.trend}
            isNegativeGood
            subscript="2"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <KPICard
            label={kpiCards.reusePercentage.label}
            value={kpiCards.reusePercentage.value}
            unit={kpiCards.reusePercentage.unit}
            trend={kpiCards.reusePercentage.trend}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <KPICard
            label={kpiCards.renovationCost.label}
            value={kpiCards.renovationCost.value}
            unit={kpiCards.renovationCost.unit}
            isCurrency
          />
        </Grid>
      </Grid>

      {/* Counter Cards Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <CounterCard
            label={counters.properties.label}
            value={counters.properties.value}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CounterCard
            label={counters.activeProjects.label}
            value={counters.activeProjects.value}
            highlight
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CounterCard
            label={counters.clients.label}
            value={counters.clients.value}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CounterCard
            label={counters.inventoryItems.label}
            value={counters.inventoryItems.value}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <CO2TrendChart data={co2Trend} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AlertsPanel alerts={alerts} />
        </Grid>
      </Grid>

      {/* Bar Chart and Lists Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <CO2BarChart data={co2PerProperty} title="CO₂ per kiinteistö" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopList 
            title="Top 5 kiinteistöt" 
            items={topProperties} 
            linkPath="/kiinteistot"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopList 
            title="Top 5 projektit" 
            items={topProjects.map(p => ({
              id: p.id,
              name: p.name,
              value: p.savings,
              unit: 'kg CO₂'
            }))} 
            linkPath="/projektit"
          />
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ActionsList actions={actions} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InventorySummaryCard data={inventorySummary} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;


