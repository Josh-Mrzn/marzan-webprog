import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// ── Shared ────────────────────────────────────────────────────────────────────

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

const ChartCard = ({ title, subtitle, children }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
      border: '1px solid rgba(0,0,0,0.05)',
    }}
  >
    <CardContent>
      <Typography variant="subtitle1" fontWeight={700}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </CardContent>
  </Card>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const kpis = [
  { label: 'Revenue', value: 76, trend: '+8%', up: true, color: '#3b82f6', bg: '#eff6ff' },
  { label: 'Satisfaction', value: 88, trend: '+3%', up: true, color: '#10b981', bg: '#f0fdf4' },
  { label: 'Retention', value: 62, trend: '-2%', up: false, color: '#f59e0b', bg: '#fffbeb' },
  { label: 'Conversion', value: 45, trend: '+12%', up: true, color: '#8b5cf6', bg: '#f5f3ff' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

function ReportsPage() {
  return (
    <Box>
      {/* Page heading */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#1e293b">
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Data visualization and analytics overview for the current period.
        </Typography>
      </Box>

      {/* ── KPI Gauges ── */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader title="Key Performance Indicators" subtitle="Real-time metrics snapshot" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {kpis.map(({ label, value, trend, up, color, bg }) => (
            <Card
              key={label}
              sx={{
                flex: 1,
                borderRadius: 3,
                boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                transition: 'transform 0.15s',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <Box sx={{ bgcolor: bg, px: 1.5, py: 0.5, borderRadius: 5, mb: 1 }}>
                <Typography variant="caption" sx={{ color, fontWeight: 700 }}>
                  {label}
                </Typography>
              </Box>
              <Gauge width={140} height={140} value={value} />
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                {up ? (
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16, color: '#ef4444' }} />
                )}
                <Typography
                  variant="caption"
                  sx={{ color: up ? '#10b981' : '#ef4444', fontWeight: 700 }}
                >
                  {trend}
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5 }}>
                {value}%
              </Typography>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* ── Revenue & Growth side by side ── */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader title="Revenue & Growth" subtitle="Monthly performance over the year" />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <ChartCard title="Monthly Revenue" subtitle="Jan – Dec in USD">
            <BarChart
              series={[
                {
                  data: [4000, 3000, 5000, 4500, 6000, 5500, 7000, 6500, 8000, 7500, 9000, 8500],
                  label: 'Revenue ($)',
                  color: '#3b82f6',
                },
              ]}
              height={260}
              xAxis={[{
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                scaleType: 'band',
              }]}
            />
          </ChartCard>

          <ChartCard title="User Growth" subtitle="New vs. active users monthly">
            <LineChart
              xAxis={[{
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                label: 'Month',
                scaleType: 'point',
              }]}
              series={[
                { data: [100, 150, 200, 280, 350, 420, 500, 600, 720, 850, 1000, 1200], label: 'New Users', color: '#3b82f6' },
                { data: [80, 100, 130, 180, 230, 280, 340, 410, 490, 580, 700, 850], label: 'Active Users', color: '#10b981' },
              ]}
              height={260}
            />
          </ChartCard>
        </Box>
      </Box>

      {/* ── Market Distribution ── */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader title="Market Distribution" subtitle="Traffic source & device usage breakdown" />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <ChartCard title="Traffic Source" subtitle="Where your visitors come from">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[{
                  data: [
                    { id: 0, value: 40, label: 'Organic' },
                    { id: 1, value: 25, label: 'Direct' },
                    { id: 2, value: 20, label: 'Social' },
                    { id: 3, value: 15, label: 'Email' },
                  ],
                  innerRadius: 50,
                  paddingAngle: 3,
                  cornerRadius: 4,
                }]}
                width={340}
                height={240}
              />
            </Box>
          </ChartCard>

          <ChartCard title="Device Usage" subtitle="Platform breakdown by session">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[{
                  data: [
                    { id: 0, value: 55, label: 'Mobile' },
                    { id: 1, value: 30, label: 'Desktop' },
                    { id: 2, value: 15, label: 'Tablet' },
                  ],
                  innerRadius: 50,
                  paddingAngle: 3,
                  cornerRadius: 4,
                }]}
                width={340}
                height={240}
              />
            </Box>
          </ChartCard>
        </Box>
      </Box>

      {/* ── Quarterly Comparison ── */}
      <Box sx={{ mb: 2 }}>
        <SectionHeader title="Quarterly Sales Comparison" subtitle="Series 1 vs Series 2 performance" />
        <ChartCard title="Q1 – Q4 Breakdown" subtitle="Side-by-side quarterly comparison">
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1', color: '#3b82f6' },
              { data: [51, 6, 49, 30], label: 'Series 2', color: '#10b981' },
            ]}
            height={300}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          />
        </ChartCard>
      </Box>
    </Box>
  );
}

export default ReportsPage;
