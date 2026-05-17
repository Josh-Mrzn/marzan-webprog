import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import InsightsIcon from '@mui/icons-material/Insights';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BoltIcon from '@mui/icons-material/Bolt';
import FlagIcon from '@mui/icons-material/Flag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LanguageIcon from '@mui/icons-material/Language';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// ── Theme tokens ──────────────────────────────────────────────────────────────

const PALETTE = {
  blue: '#3b82f6',
  green: '#10b981',
  amber: '#f59e0b',
  violet: '#8b5cf6',
  rose: '#f43f5e',
  cyan: '#06b6d4',
  pink: '#ec4899',
  slate: '#1e293b',
  muted: '#64748b',
};

const cardSx = {
  borderRadius: 4,
  boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.04)',
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
};

// ── Shared components ─────────────────────────────────────────────────────────

const SectionHeader = ({ title, subtitle, icon: Icon, accent = PALETTE.blue, action }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ mb: 2.5 }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {Icon && (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
            border: `1px solid ${accent}33`,
            flexShrink: 0,
          }}
        >
          <Icon sx={{ color: accent, fontSize: 20 }} />
        </Box>
      )}
      <Box>
        <Typography variant="h6" fontWeight={700} lineHeight={1.2} color={PALETTE.slate}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
    {action}
  </Stack>
);

const ChartCard = ({ title, subtitle, legend, action, children }) => (
  <Card sx={cardSx}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} color={PALETTE.slate}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {legend && (
            <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
              {legend.map((item) => (
                <Stack key={item.label} direction="row" alignItems="center" spacing={0.75}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
          {action ?? (
            <IconButton size="small" sx={{ color: PALETTE.muted }}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <Box
        sx={{
          borderRadius: 2.5,
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          border: '1px solid #f1f5f9',
          p: 1.5,
        }}
      >
        {children}
      </Box>
    </CardContent>
  </Card>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const kpis = [
  {
    label: 'Revenue',
    value: 76,
    trend: '+8%',
    up: true,
    color: PALETTE.blue,
    bg: '#eff6ff',
    note: 'Strong growth this quarter',
    spark: [40, 45, 38, 52, 48, 60, 58, 72, 68, 76],
  },
  {
    label: 'Satisfaction',
    value: 88,
    trend: '+3%',
    up: true,
    color: PALETTE.green,
    bg: '#f0fdf4',
    note: 'Customer reviews trending up',
    spark: [70, 72, 75, 74, 78, 80, 82, 85, 86, 88],
  },
  {
    label: 'Retention',
    value: 62,
    trend: '-2%',
    up: false,
    color: PALETTE.amber,
    bg: '#fffbeb',
    note: 'Slight dip — needs attention',
    spark: [70, 68, 72, 69, 67, 70, 66, 64, 65, 62],
  },
  {
    label: 'Conversion',
    value: 45,
    trend: '+12%',
    up: true,
    color: PALETTE.violet,
    bg: '#f5f3ff',
    note: 'Best month all year',
    spark: [25, 28, 32, 30, 33, 36, 38, 40, 42, 45],
  },
];

const summaryStats = [
  { label: 'Total Revenue', value: '$74.5K', delta: '+8.2%', up: true },
  { label: 'Active Sessions', value: '12,840', delta: '+15.4%', up: true },
  { label: 'Avg. Order Value', value: '$248', delta: '+2.1%', up: true },
  { label: 'Bounce Rate', value: '32.1%', delta: '-4.3%', up: true },
];

const channels = [
  { name: 'Organic Search', icon: LanguageIcon, color: PALETTE.blue, value: 40, visitors: '12.4K' },
  { name: 'Direct Traffic', icon: BoltIcon, color: PALETTE.violet, value: 25, visitors: '7.8K' },
  { name: 'Social Media', icon: CampaignIcon, color: PALETTE.cyan, value: 20, visitors: '6.1K' },
  { name: 'Email Campaign', icon: EmailIcon, color: PALETTE.amber, value: 15, visitors: '4.7K' },
];

const goals = [
  { label: 'Q4 Revenue Target', current: 745, target: 1000, unit: 'K', color: PALETTE.blue },
  { label: 'New Signups', current: 1840, target: 2500, unit: '', color: PALETTE.green },
  { label: 'Customer NPS', current: 72, target: 80, unit: '', color: PALETTE.violet },
  { label: 'Support Resolution', current: 94, target: 95, unit: '%', color: PALETTE.amber },
];

const insights = [
  {
    icon: RocketLaunchIcon,
    color: PALETTE.green,
    title: 'Conversion up 12% MoM',
    text: 'Checkout flow updates are paying off — biggest gain since launch.',
    tag: 'Positive',
  },
  {
    icon: WarningAmberIcon,
    color: PALETTE.amber,
    title: 'Retention dropping in Tier 2',
    text: 'Customers on mid-tier plans show a 2% dip. Worth a closer look.',
    tag: 'Watch',
  },
  {
    icon: LightbulbIcon,
    color: PALETTE.violet,
    title: 'Mobile sessions now 55%',
    text: 'Consider prioritizing mobile-first features for next quarter roadmap.',
    tag: 'Idea',
  },
];

const activity = [
  { who: 'Sarah Chen', action: 'exported the Q4 sales report', time: '2 min ago', color: PALETTE.blue },
  { who: 'Marcus Lee', action: 'flagged anomaly in retention data', time: '18 min ago', color: PALETTE.amber },
  { who: 'Priya Shah', action: 'shared insights with the team', time: '1 hr ago', color: PALETTE.green },
  { who: 'David Kim', action: 'updated revenue forecasting model', time: '3 hr ago', color: PALETTE.violet },
];

const ranges = ['Today', '7 Days', '30 Days', 'Quarter', 'Year', 'Custom'];

// ── Page ──────────────────────────────────────────────────────────────────────

function ReportsPage() {
  const printRef = useRef(null);
  const [activeRange, setActiveRange] = useState('30 Days');

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reports Summary</title>
          ${headMarkup}
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }
            .report-shell { padding: 28px; }
            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }
            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }
            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }
            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .report-content .MuiCardContent-root { padding: 20px; }
            .report-content svg { max-width: 100%; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview with KPI gauges, revenue, growth, and distribution breakdowns.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      {/* ── Hero header banner ── */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          mb: 3,
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #3b82f6 100%)',
          color: '#fff',
          px: { xs: 3, md: 5 },
          py: { xs: 4, md: 5 },
        }}
      >
        {/* Decorative orbs */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            bottom: -120,
            left: -60,
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        {/* Grid texture */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
          }}
        />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={3}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <Chip
                icon={<CalendarMonthIcon sx={{ color: '#fff !important', fontSize: 16 }} />}
                label="May 2026"
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(8px)',
                }}
              />
              <Chip
                label="● Live"
                size="small"
                sx={{
                  bgcolor: 'rgba(16,185,129,0.95)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                }}
              />
              <Chip
                label="Synced 2 min ago"
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 500,
                  fontSize: 11,
                }}
              />
            </Stack>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ letterSpacing: -0.5, fontSize: { xs: 28, md: 34 } }}
            >
              Reports &amp; Analytics
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 0.75, maxWidth: 580, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}
            >
              Real-time data visualization across revenue, growth, and audience &mdash; with
              insights to help you act on what matters most.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              startIcon={<AutoGraphIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2.5,
                bgcolor: '#fff',
                color: PALETTE.slate,
                px: 2.5,
                '&:hover': { bgcolor: '#f1f5f9' },
              }}
            >
              Generate
            </Button>
            <Button
              variant="outlined"
              startIcon={<PictureAsPdfIcon />}
              onClick={handlePrint}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2.5,
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.45)',
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Export PDF
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2.5,
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.45)',
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Filter
            </Button>
            <Tooltip title="Refresh data">
              <IconButton
                sx={{
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.45)',
                  borderRadius: 2.5,
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Summary stats inside the hero */}
        <Box
          sx={{
            mt: 4,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {summaryStats.map((s) => (
            <Box
              key={s.label}
              sx={{
                p: 2.25,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(12px)',
                transition: 'transform 0.2s ease, background 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  bgcolor: 'rgba(255,255,255,0.16)',
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  fontSize: 10,
                }}
              >
                {s.label}
              </Typography>
              <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5, color: '#fff' }}>
                {s.value}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                {s.up ? (
                  <TrendingUpIcon sx={{ fontSize: 14, color: '#86efac' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 14, color: '#fca5a5' }} />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: s.up ? '#86efac' : '#fca5a5',
                    fontWeight: 700,
                    fontSize: 11,
                  }}
                >
                  {s.delta}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>
                  vs last period
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Date range pill tabs ── */}
      <Card sx={{ ...cardSx, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            p: 1.5,
            px: 2.5,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Typography
              variant="caption"
              sx={{
                color: PALETTE.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                mr: 1,
              }}
            >
              Date Range
            </Typography>
            {ranges.map((range) => {
              const active = activeRange === range;
              return (
                <Chip
                  key={range}
                  label={range}
                  size="small"
                  onClick={() => setActiveRange(range)}
                  sx={{
                    fontWeight: 600,
                    fontSize: 12,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    ...(active
                      ? {
                          bgcolor: PALETTE.slate,
                          color: '#fff',
                          '&:hover': { bgcolor: '#0f172a' },
                        }
                      : {
                          bgcolor: '#f1f5f9',
                          color: PALETTE.muted,
                          '&:hover': { bgcolor: '#e2e8f0' },
                        }),
                  }}
                />
              );
            })}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<ScheduleIcon sx={{ fontSize: 14 }} />}
              label="Auto-refresh: On"
              size="small"
              sx={{
                bgcolor: '#f0fdf4',
                color: PALETTE.green,
                fontWeight: 600,
                fontSize: 11,
                '& .MuiChip-icon': { color: PALETTE.green },
              }}
            />
          </Stack>
        </Box>
      </Card>

      <Box ref={printRef}>
        {/* ── KPI Gauges with sparklines ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title="Key Performance Indicators"
            subtitle="Real-time metrics snapshot across the business"
            icon={InsightsIcon}
            accent={PALETTE.blue}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
              gap: 2.5,
            }}
          >
            {kpis.map(({ label, value, trend, up, color, bg, note, spark }) => (
              <Card
                key={label}
                sx={{
                  ...cardSx,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 28px rgba(15,23,42,0.10)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, ${bg} 0%, #ffffff 60%)`,
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                  }}
                />
                <CardContent
                  sx={{
                    position: 'relative',
                    p: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: '100%', mb: 1 }}
                  >
                    <Chip
                      label={label}
                      size="small"
                      sx={{
                        bgcolor: bg,
                        color,
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: 0.3,
                        height: 24,
                      }}
                    />
                    <Stack direction="row" alignItems="center" spacing={0.4}>
                      {up ? (
                        <TrendingUpIcon sx={{ fontSize: 14, color: PALETTE.green }} />
                      ) : (
                        <TrendingDownIcon sx={{ fontSize: 14, color: PALETTE.rose }} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          color: up ? PALETTE.green : PALETTE.rose,
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      >
                        {trend}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Gauge
                    width={150}
                    height={150}
                    value={value}
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 26,
                        fontWeight: 800,
                        fill: PALETTE.slate,
                      },
                      [`& .${gaugeClasses.valueArc}`]: { fill: color },
                      [`& .${gaugeClasses.referenceArc}`]: { fill: `${color}22` },
                    }}
                  />

                  {/* Sparkline trend */}
                  <Box sx={{ width: '100%', mt: 1, px: 1 }}>
                    <SparkLineChart
                      data={spark}
                      height={36}
                      curve="monotoneX"
                      area
                      showHighlight
                      colors={[color]}
                      sx={{
                        '& .MuiAreaElement-root': { fill: `${color}33` },
                      }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, textAlign: 'center', fontWeight: 500 }}
                  >
                    {note}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* ── Revenue & Growth side by side ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title="Revenue & Growth"
            subtitle="Monthly performance trends over the year"
            icon={AutoGraphIcon}
            accent={PALETTE.green}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 2.5,
            }}
          >
            <ChartCard
              title="Monthly Revenue"
              subtitle="Jan – Dec, in USD"
              legend={[{ label: 'Revenue', color: PALETTE.blue }]}
            >
              <BarChart
                series={[
                  {
                    data: [4000, 3000, 5000, 4500, 6000, 5500, 7000, 6500, 8000, 7500, 9000, 8500],
                    label: 'Revenue ($)',
                    color: PALETTE.blue,
                  },
                ]}
                height={280}
                xAxis={[
                  {
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    scaleType: 'band',
                  },
                ]}
                borderRadius={6}
                slotProps={{ legend: { hidden: true } }}
              />
            </ChartCard>

            <ChartCard
              title="User Growth"
              subtitle="New vs. active users, by month"
              legend={[
                { label: 'New Users', color: PALETTE.blue },
                { label: 'Active Users', color: PALETTE.green },
              ]}
            >
              <LineChart
                xAxis={[
                  {
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    label: 'Month',
                    scaleType: 'point',
                  },
                ]}
                series={[
                  {
                    data: [100, 150, 200, 280, 350, 420, 500, 600, 720, 850, 1000, 1200],
                    label: 'New Users',
                    color: PALETTE.blue,
                    curve: 'monotoneX',
                    area: true,
                  },
                  {
                    data: [80, 100, 130, 180, 230, 280, 340, 410, 490, 580, 700, 850],
                    label: 'Active Users',
                    color: PALETTE.green,
                    curve: 'monotoneX',
                  },
                ]}
                height={280}
                slotProps={{ legend: { hidden: true } }}
              />
            </ChartCard>
          </Box>
        </Box>

        {/* ── Channels + Goals ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title="Performance Breakdown"
            subtitle="Top channels and progress toward key targets"
            icon={ShoppingBagIcon}
            accent={PALETTE.cyan}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 2.5,
            }}
          >
            {/* Top Channels card */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2.5 }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} color={PALETTE.slate}>
                      Top Traffic Channels
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Ranked by share of visitors this period
                    </Typography>
                  </Box>
                  <Chip
                    label="31,000 visitors"
                    size="small"
                    sx={{
                      bgcolor: '#f1f5f9',
                      color: PALETTE.slate,
                      fontWeight: 700,
                      fontSize: 11,
                    }}
                  />
                </Stack>
                <Stack spacing={2.5}>
                  {channels.map((c, idx) => {
                    const Icon = c.icon;
                    return (
                      <Box key={c.name}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 0.75 }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: `linear-gradient(135deg, ${c.color}1f, ${c.color}0f)`,
                                border: `1px solid ${c.color}33`,
                              }}
                            >
                              <Icon sx={{ color: c.color, fontSize: 18 }} />
                            </Box>
                            <Box>
                              <Typography
                                variant="body2"
                                fontWeight={700}
                                color={PALETTE.slate}
                                sx={{ lineHeight: 1.3 }}
                              >
                                {c.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Rank #{idx + 1} · {c.visitors} visitors
                              </Typography>
                            </Box>
                          </Stack>
                          <Typography
                            variant="subtitle2"
                            fontWeight={800}
                            color={PALETTE.slate}
                          >
                            {c.value}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={c.value * 2.5}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: `${c.color}1a`,
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: `linear-gradient(90deg, ${c.color}, ${c.color}cc)`,
                            },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>

            {/* Goals card */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2.5 }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} color={PALETTE.slate}>
                      Goals & Targets
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Progress toward this quarter&apos;s objectives
                    </Typography>
                  </Box>
                  <Chip
                    icon={<FlagIcon sx={{ fontSize: 14, color: `${PALETTE.violet} !important` }} />}
                    label="On Track"
                    size="small"
                    sx={{
                      bgcolor: '#f5f3ff',
                      color: PALETTE.violet,
                      fontWeight: 700,
                      fontSize: 11,
                    }}
                  />
                </Stack>
                <Stack spacing={2.5}>
                  {goals.map((g) => {
                    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                    return (
                      <Box key={g.label}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 0.75 }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color={PALETTE.slate}
                          >
                            {g.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            <Box component="span" sx={{ color: g.color, fontWeight: 800 }}>
                              {g.current}
                              {g.unit}
                            </Box>{' '}
                            / {g.target}
                            {g.unit}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <LinearProgress
                            variant="determinate"
                            value={pct}
                            sx={{
                              flex: 1,
                              height: 10,
                              borderRadius: 5,
                              bgcolor: '#f1f5f9',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 5,
                                background: `linear-gradient(90deg, ${g.color}, ${g.color}cc)`,
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 800,
                              color: g.color,
                              minWidth: 36,
                              textAlign: 'right',
                            }}
                          >
                            {pct}%
                          </Typography>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* ── Market Distribution ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title="Market Distribution"
            subtitle="Traffic source & device usage breakdown"
            icon={InsightsIcon}
            accent={PALETTE.violet}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 2.5,
            }}
          >
            <ChartCard title="Traffic Source" subtitle="Where your visitors come from">
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  colors={[PALETTE.blue, PALETTE.violet, PALETTE.cyan, PALETTE.amber]}
                  series={[
                    {
                      data: [
                        { id: 0, value: 40, label: 'Organic' },
                        { id: 1, value: 25, label: 'Direct' },
                        { id: 2, value: 20, label: 'Social' },
                        { id: 3, value: 15, label: 'Email' },
                      ],
                      innerRadius: 60,
                      outerRadius: 110,
                      paddingAngle: 3,
                      cornerRadius: 6,
                    },
                  ]}
                  width={360}
                  height={260}
                />
              </Box>
            </ChartCard>

            <ChartCard title="Device Usage" subtitle="Platform breakdown by session">
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  colors={[PALETTE.green, PALETTE.blue, PALETTE.amber]}
                  series={[
                    {
                      data: [
                        { id: 0, value: 55, label: 'Mobile' },
                        { id: 1, value: 30, label: 'Desktop' },
                        { id: 2, value: 15, label: 'Tablet' },
                      ],
                      innerRadius: 60,
                      outerRadius: 110,
                      paddingAngle: 3,
                      cornerRadius: 6,
                    },
                  ]}
                  width={360}
                  height={260}
                />
              </Box>
            </ChartCard>
          </Box>
        </Box>

        {/* ── Insights & Activity ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title="Insights & Activity"
            subtitle="AI-generated takeaways and team activity feed"
            icon={LightbulbIcon}
            accent={PALETTE.amber}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
              gap: 2.5,
            }}
          >
            {/* Insights */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2.5 }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} color={PALETTE.slate}>
                      Smart Insights
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Auto-detected patterns from this period&apos;s data
                    </Typography>
                  </Box>
                  <Chip
                    icon={<StarIcon sx={{ fontSize: 14, color: `${PALETTE.amber} !important` }} />}
                    label="3 new"
                    size="small"
                    sx={{
                      bgcolor: '#fffbeb',
                      color: PALETTE.amber,
                      fontWeight: 700,
                      fontSize: 11,
                    }}
                  />
                </Stack>
                <Stack spacing={1.75}>
                  {insights.map((ins) => {
                    const Icon = ins.icon;
                    return (
                      <Box
                        key={ins.title}
                        sx={{
                          display: 'flex',
                          gap: 1.75,
                          p: 2,
                          borderRadius: 3,
                          border: '1px solid #f1f5f9',
                          background: `linear-gradient(90deg, ${ins.color}08, transparent)`,
                          transition: 'transform 0.15s ease, border-color 0.15s ease',
                          '&:hover': {
                            transform: 'translateX(2px)',
                            borderColor: `${ins.color}55`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `linear-gradient(135deg, ${ins.color}22, ${ins.color}11)`,
                            border: `1px solid ${ins.color}33`,
                          }}
                        >
                          <Icon sx={{ color: ins.color, fontSize: 20 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.25 }}>
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              color={PALETTE.slate}
                            >
                              {ins.title}
                            </Typography>
                            <Chip
                              label={ins.tag}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: 9.5,
                                fontWeight: 700,
                                letterSpacing: 0.3,
                                bgcolor: `${ins.color}1a`,
                                color: ins.color,
                                textTransform: 'uppercase',
                              }}
                            />
                          </Stack>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ lineHeight: 1.6, display: 'block' }}
                          >
                            {ins.text}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>

            {/* Activity feed */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2.5 }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} color={PALETTE.slate}>
                      Recent Activity
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      What your team has been doing
                    </Typography>
                  </Box>
                  <Chip
                    icon={<GroupsIcon sx={{ fontSize: 14, color: `${PALETTE.blue} !important` }} />}
                    label="4 today"
                    size="small"
                    sx={{
                      bgcolor: '#eff6ff',
                      color: PALETTE.blue,
                      fontWeight: 700,
                      fontSize: 11,
                    }}
                  />
                </Stack>
                <Stack spacing={0}>
                  {activity.map((item, idx) => (
                    <React.Fragment key={item.who + item.time}>
                      <Stack
                        direction="row"
                        spacing={1.75}
                        alignItems="flex-start"
                        sx={{ py: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: `${item.color}1a`,
                            color: item.color,
                            fontWeight: 800,
                            fontSize: 13,
                            border: `1px solid ${item.color}33`,
                          }}
                        >
                          {item.who
                            .split(' ')
                            .map((s) => s[0])
                            .join('')}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            color={PALETTE.slate}
                            sx={{ lineHeight: 1.5 }}
                          >
                            <Box component="span" sx={{ fontWeight: 700 }}>
                              {item.who}
                            </Box>{' '}
                            <Box component="span" sx={{ color: PALETTE.muted }}>
                              {item.action}
                            </Box>
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            sx={{ mt: 0.5 }}
                          >
                            <ScheduleIcon sx={{ fontSize: 12, color: PALETTE.muted }} />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: 11 }}
                            >
                              {item.time}
                            </Typography>
                          </Stack>
                        </Box>
                        <CheckCircleIcon
                          sx={{ fontSize: 16, color: PALETTE.green, mt: 0.5 }}
                        />
                      </Stack>
                      {idx < activity.length - 1 && <Divider sx={{ borderColor: '#f1f5f9' }} />}
                    </React.Fragment>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* ── Quarterly Comparison ── */}
        <Box sx={{ mb: 2 }}>
          <SectionHeader
            title="Quarterly Sales Comparison"
            subtitle="Side-by-side performance across all four quarters"
            icon={AutoGraphIcon}
            accent={PALETTE.amber}
          />
          <ChartCard
            title="Q1 – Q4 Breakdown"
            subtitle="Series 1 vs Series 2 totals"
            legend={[
              { label: 'Series 1', color: PALETTE.blue },
              { label: 'Series 2', color: PALETTE.green },
            ]}
          >
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1', color: PALETTE.blue },
                { data: [51, 6, 49, 30], label: 'Series 2', color: PALETTE.green },
              ]}
              height={320}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              borderRadius={6}
              slotProps={{ legend: { hidden: true } }}
            />
          </ChartCard>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportsPage;
