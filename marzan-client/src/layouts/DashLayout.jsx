import React, { useMemo, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { clearSession, getCurrentUser } from '../services/auth';

const SIDEBAR_BG = '#0f172a';
const SIDEBAR_ACTIVE = '#3b82f6';
const SIDEBAR_TEXT = '#94a3b8';
const PAGE_BG = '#f1f5f9';
const drawerWidth = 240;

const ALL_NAV_ITEMS = [
  { label: 'Dashboard', title: 'Dashboard', to: '/dashboard/', icon: DashboardIcon, roles: ['admin'] },
  { label: 'Reports', title: 'Reports', to: '/dashboard/reports', icon: AssessmentIcon, roles: ['admin'] },
  { label: 'Articles', title: 'Articles', to: '/dashboard/articles', icon: ArticleIcon, roles: ['admin'] },
  { label: 'Users', title: 'Users', to: '/dashboard/users', icon: PeopleIcon, roles: ['admin'] },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
  backgroundColor: SIDEBAR_BG,
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  flexShrink: 0,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#ffffff',
  color: '#1e293b',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      backgroundColor: SIDEBAR_BG,
      color: SIDEBAR_TEXT,
      borderRight: 'none',
      boxShadow: '4px 0 24px rgba(0,0,0,0.25)',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      backgroundColor: SIDEBAR_BG,
      color: SIDEBAR_TEXT,
      borderRight: 'none',
      boxShadow: '4px 0 12px rgba(0,0,0,0.2)',
    },
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: '#f1f5f9',
  border: '1px solid #e2e8f0',
  '&:hover': { backgroundColor: '#e8edf3' },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#94a3b8',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#475569',
  fontSize: 14,
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.8, 1, 0.8, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    width: '18ch',
  },
}));

const getPageTitle = (pathname, navItems) => {
  const normalized = pathname.replace(/\/$/, '');
  return (
    navItems.find(({ to }) => to.replace(/\/$/, '') === normalized)?.title ?? 'Dashboard'
  );
};

const initialsFrom = (firstName, lastName) =>
  `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}` || 'U';

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = useMemo(() => getCurrentUser(), []);
  const userType = currentUser?.type || 'admin';

  const navItems = useMemo(
    () => ALL_NAV_ITEMS.filter((item) => item.roles.includes(userType)),
    [userType],
  );

  const pageTitle = getPageTitle(location.pathname, ALL_NAV_ITEMS);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => {
    clearSession();
    navigate('/auth/signin', { replace: true });
  };

  const initials = initialsFrom(currentUser?.firstName, currentUser?.lastName);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ color: '#64748b', ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              variant="h6"
              noWrap
              sx={{ fontWeight: 700, color: '#1e293b', fontSize: 18 }}
            >
              {pageTitle}
            </Typography>
            {currentUser && (
              <Chip
                size="small"
                label={`Welcome, ${currentUser.firstName}`}
                sx={{
                  bgcolor: '#eff6ff',
                  color: '#1d4ed8',
                  fontWeight: 600,
                  display: { xs: 'none', md: 'inline-flex' },
                }}
              />
            )}
          </Box>

          <Search sx={{ display: { xs: 'none', md: 'block' } }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 18 }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Tooltip title="Notifications">
            <IconButton sx={{ color: '#64748b' }}>
              <Badge badgeContent={3} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton sx={{ color: '#64748b' }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1.5 }} />

          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} sx={{ color: '#64748b' }}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              bgcolor: SIDEBAR_ACTIVE,
              width: 34,
              height: 34,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              ml: 0.5,
            }}
          >
            {initials}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: SIDEBAR_ACTIVE,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <DashboardIcon sx={{ color: '#fff', fontSize: 17 }} />
          </Box>
          {open && (
            <Typography
              variant="subtitle1"
              sx={{ color: '#ffffff', fontWeight: 700, letterSpacing: 0.5, ml: 1.5, flexGrow: 1 }}
            >
              AdminPanel
            </Typography>
          )}
          {open && (
            <IconButton onClick={handleDrawerClose} sx={{ color: SIDEBAR_TEXT, ml: 'auto' }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </DrawerHeader>

        <Box sx={{ px: 1, pt: 2, flexGrow: 1 }}>
          {open && (
            <Typography
              variant="caption"
              sx={{
                color: '#475569',
                fontWeight: 600,
                letterSpacing: 1.1,
                px: 1.5,
                textTransform: 'uppercase',
                display: 'block',
                mb: 1,
              }}
            >
              Navigation
            </Typography>
          )}
          <List disablePadding>
            {navItems.map(({ label, to, icon: Icon }) => {
              const isActive = location.pathname.replace(/\/$/, '') === to.replace(/\/$/, '');
              return (
                <ListItem key={to} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                  <Tooltip title={open ? '' : label} placement="right" arrow>
                    <ListItemButton
                      component={Link}
                      to={to}
                      sx={{
                        minHeight: 44,
                        px: 1.5,
                        borderRadius: 2,
                        justifyContent: open ? 'initial' : 'center',
                        backgroundColor: isActive ? SIDEBAR_ACTIVE : 'transparent',
                        color: isActive ? '#ffffff' : SIDEBAR_TEXT,
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          backgroundColor: isActive ? '#2563eb' : 'rgba(255,255,255,0.07)',
                          color: isActive ? '#ffffff' : '#e2e8f0',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : 'auto',
                          justifyContent: 'center',
                          color: 'inherit',
                        }}
                      >
                        <Icon sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={label}
                        sx={{
                          opacity: open ? 1 : 0,
                          '& .MuiListItemText-primary': {
                            fontSize: 14,
                            fontWeight: isActive ? 600 : 400,
                          },
                        }}
                      />
                      {isActive && open && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.7)',
                            ml: 1,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {open && currentUser && (
          <Box
            sx={{
              m: 1.5,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ bgcolor: SIDEBAR_ACTIVE, width: 32, height: 32, fontSize: 12, fontWeight: 700 }}>
                {initials}
              </Avatar>
              <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
                <Typography variant="body2" sx={{ color: '#e2e8f0', fontWeight: 600, lineHeight: 1.3 }} noWrap>
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#475569', fontSize: 11, textTransform: 'capitalize' }}>
                  {userType} · {currentUser.email}
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: PAGE_BG, minHeight: '100vh' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
