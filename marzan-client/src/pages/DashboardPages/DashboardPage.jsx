import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIconRetinaPng,
  shadowUrl: markerShadowPng,
});

// ── Data ──────────────────────────────────────────────────────────────────────

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'firstName', headerName: 'First name', width: 130, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 130, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 100, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const validAges = rows.filter((r) => r.age !== null);
const avgAge = (validAges.reduce((sum, r) => sum + r.age, 0) / validAges.length).toFixed(1);

// ── Sub-components ────────────────────────────────────────────────────────────

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
    <Box sx={{ width: 4, height: 20, bgcolor: '#3b82f6', borderRadius: 1, flexShrink: 0 }} />
    <Box>
      <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

const StatCard = ({ label, value, icon: Icon, color, bg, trend, trendLabel }) => (
  <Card
    sx={{
      flex: 1,
      borderRadius: 3,
      boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
      border: '1px solid rgba(0,0,0,0.05)',
      transition: 'transform 0.15s, box-shadow 0.15s',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    }}
  >
    <CardContent sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ lineHeight: 1.1, mb: 1 }}>
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <ArrowUpwardIcon sx={{ fontSize: 14, color: '#10b981' }} />
            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
              {trend}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {trendLabel}
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            bgcolor: bg,
            p: 1.5,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ color, fontSize: 28 }} />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const GaugeCard = ({ label, value, max, color }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <Card
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
        {label}
      </Typography>
      <Gauge width={160} height={160} value={value} valueMax={max} />
      <Chip
        label={`${pct}%`}
        size="small"
        sx={{ mt: 1, bgcolor: color, color: '#fff', fontWeight: 700, fontSize: 13 }}
      />
    </Card>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <Box>
      {/* Page heading */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#1e293b">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Welcome back, Admin! Here's what's happening today.
        </Typography>
      </Box>

      {/* ── Stat Cards ── */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <StatCard
          label="Total Users"
          value={rows.length}
          icon={PeopleAltIcon}
          color="#3b82f6"
          bg="#eff6ff"
          trend="+12%"
          trendLabel="vs last month"
        />
        <StatCard
          label="Average Age"
          value={avgAge}
          icon={TrendingUpIcon}
          color="#10b981"
          bg="#f0fdf4"
          trend="+2.3 pts"
          trendLabel="vs last month"
        />
        <StatCard
          label="Active Users"
          value={7}
          icon={CheckCircleIcon}
          color="#f59e0b"
          bg="#fffbeb"
          trend="+5%"
          trendLabel="vs last month"
        />
        <StatCard
          label="New This Month"
          value={3}
          icon={PersonAddIcon}
          color="#8b5cf6"
          bg="#f5f3ff"
          trend="+18%"
          trendLabel="vs last month"
        />
      </Stack>

      {/* ── Gauges ── */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader title="KPI Gauges" subtitle="Key performance indicators at a glance" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <GaugeCard label="Completion Rate" value={590} max={1000} color="#3b82f6" />
          <GaugeCard label="Satisfaction Score" value={50} max={150} color="#10b981" />
          <GaugeCard label="Capacity Used" value={10} max={10} color="#f59e0b" />
        </Stack>
      </Box>

      {/* ── Charts ── */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader title="Sales Overview" subtitle="Quarterly performance comparison" />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 1.4fr' },
            gap: 2,
          }}
        >
          {/* Bar Chart */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Quarterly Sales
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Series 1 vs Series 2 — Q1 through Q4
              </Typography>
              <Box sx={{ mt: 1 }}>
                <BarChart
                  series={[
                    { data: [35, 44, 24, 34], label: 'Series 1' },
                    { data: [51, 6, 49, 30], label: 'Series 2' },
                  ]}
                  height={240}
                  xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Distribution
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Category breakdown
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'Series A' },
                        { id: 1, value: 15, label: 'Series B' },
                        { id: 2, value: 20, label: 'Series C' },
                      ],
                      innerRadius: 40,
                      paddingAngle: 3,
                      cornerRadius: 4,
                    },
                  ]}
                  width={240}
                  height={240}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* ── DataGrid ── */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader title="Users Overview" subtitle="All registered users with editable details" />
        <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <Box sx={{ height: 420 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8fafc', fontWeight: 700 },
                '& .MuiDataGrid-row:hover': { backgroundColor: '#f0f7ff' },
                borderRadius: 3,
              }}
            />
          </Box>
        </Card>
      </Box>

      {/* ── Map ── */}
      <Box sx={{ mb: 2 }}>
        <SectionHeader
          title="Location Map"
          subtitle="National University Manila — 551 F Jhocson St, Sampaloc"
        />
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
            border: '1px solid rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 460 }}>
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  <strong>National University-Manila</strong>
                  <br />
                  551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default DashboardPage;
