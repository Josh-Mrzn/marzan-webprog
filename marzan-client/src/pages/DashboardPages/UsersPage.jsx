import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FilterListIcon from '@mui/icons-material/FilterList';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import usersSeed from '../../assets/users.json';

// ── Constants ─────────────────────────────────────────────────────────────────

const ROLES = ['admin', 'editor', 'viewer'];
const GENDERS = ['male', 'female', 'other'];
const AVATAR_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899'];

const getAvatarColor = (id) => AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const roleChipColor = {
  admin: { bg: '#eff6ff', color: '#3b82f6' },
  editor: { bg: '#f5f3ff', color: '#8b5cf6' },
  viewer: { bg: '#f1f5f9', color: '#64748b' },
};

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

// ── Seed loader ───────────────────────────────────────────────────────────────

const loadUsers = () => {
  try {
    return {
      users: usersSeed.map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: GENDERS.includes(String(user.gender ?? '').trim().toLowerCase())
          ? String(user.gender ?? '').trim().toLowerCase()
          : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: ROLES.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/assets/users.json.',
    };
  }
};

const seed = loadUsers();

// ── Page ──────────────────────────────────────────────────────────────────────

function UsersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Search + filter state
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const printRef = useRef(null);

  // ── Form helpers ──
  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
    setShowPassword(false);
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
    setShowPassword(false);
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ── Validation (Enhancement 3) ──
  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();
    const contact = form.contactNumber.trim();
    const age = form.age.trim();
    const password = form.password;

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key] ?? '').trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Email format
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    // Age must be a number only
    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    // Contact number must be 11 digits
    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contact)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
    }

    // Username must not contain spaces
    if (!nextErrors.username && /\s/.test(username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    // Password must be at least 8 characters
    if (!nextErrors.password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    // Email uniqueness
    if (
      !nextErrors.email &&
      users.some((user) => user.id !== modal.id && user.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    // Username uniqueness
    if (
      !nextErrors.username &&
      users.some((user) => user.id !== modal.id && user.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
        : [
            ...prev,
            {
              id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
              ...nextUser,
            },
          ],
    );
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)),
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name] || '',
    fullWidth: true,
    ...extra,
  });

  // ── Filtering (Enhancement 2) ──
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !q ||
        user.firstName.toLowerCase().includes(q) ||
        user.lastName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q);
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesGender = filterGender === 'all' || user.gender === filterGender;
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && user.isActive) ||
        (filterStatus === 'inactive' && !user.isActive);
      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, search, filterRole, filterGender, filterStatus]);

  const activeCount = users.filter((u) => u.isActive).length;
  const inactiveCount = users.length - activeCount;
  const filtersActive =
    search.trim() !== '' ||
    filterRole !== 'all' ||
    filterGender !== 'all' ||
    filterStatus !== 'all';

  const resetFilters = () => {
    setSearch('');
    setFilterRole('all');
    setFilterGender('all');
    setFilterStatus('all');
  };

  // ── PDF print (Enhancement 1) ──
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

    const rowsHtml = filteredUsers
      .map(
        (u) => `
          <tr>
            <td>${u.id}</td>
            <td>${u.firstName} ${u.lastName}</td>
            <td>${u.username}</td>
            <td>${u.email}</td>
            <td>${u.contactNumber}</td>
            <td>${labelize(u.role)}</td>
            <td>${labelize(u.gender)}</td>
            <td>${u.isActive ? 'Active' : 'Inactive'}</td>
          </tr>`,
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Users Report</title>
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
            .summary {
              display: flex;
              gap: 12px;
              margin-bottom: 18px;
              flex-wrap: wrap;
            }
            .summary .pill {
              padding: 6px 12px;
              border-radius: 999px;
              font-size: 12px;
              font-weight: 600;
              border: 1px solid #e5e7eb;
              background: #f9fafb;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
              page-break-inside: auto;
            }
            thead {
              background: #f1f5f9;
            }
            th, td {
              text-align: left;
              padding: 8px 10px;
              border-bottom: 1px solid #e5e7eb;
            }
            th {
              font-weight: 700;
              color: #334155;
              text-transform: uppercase;
              letter-spacing: 0.4px;
              font-size: 11px;
            }
            tr { page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Users Report</h1>
              <p>Directory snapshot of registered users with their roles, contact details, and account status.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="summary">
              <span class="pill">Total: ${users.length}</span>
              <span class="pill">Active: ${activeCount}</span>
              <span class="pill">Inactive: ${inactiveCount}</span>
              <span class="pill">Exported rows: ${filteredUsers.length}</span>
            </section>
            <section class="report-content">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Gender</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml || `<tr><td colspan="8" style="text-align:center;padding:24px;color:#6b7280">No users to export.</td></tr>`}
                </tbody>
              </table>
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // ── Columns ──
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        const initial = (params.row.firstName || params.row.lastName || '?')[0].toUpperCase();
        return (
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ height: '100%' }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: getAvatarColor(params.row.id),
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {initial}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {`${params.row.firstName} ${params.row.lastName}`.trim() || '—'}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {params.row.email}
              </Typography>
            </Box>
          </Stack>
        );
      },
    },
    { field: 'username', headerName: 'Username', minWidth: 140, flex: 0.7 },
    { field: 'age', headerName: 'Age', width: 80, type: 'number' },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      minWidth: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => {
        const cfg = roleChipColor[params.row.role] ?? roleChipColor.viewer;
        return (
          <Chip
            label={labelize(params.row.role)}
            size="small"
            sx={{ bgcolor: cfg.bg, color: cfg.color, fontWeight: 600 }}
          />
        );
      },
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          variant={row.isActive ? 'filled' : 'outlined'}
          sx={{
            fontWeight: 600,
            bgcolor: row.isActive ? '#dcfce7' : 'transparent',
            color: row.isActive ? '#16a34a' : '#64748b',
            borderColor: row.isActive ? 'transparent' : '#cbd5e1',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon sx={{ fontSize: 16 }} />}
            onClick={() => openModal(row)}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(row.id)}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, boxShadow: 'none' }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* ── Page header ── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        gap={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} color="#1e293b">
            Users
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage and monitor all registered users.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={handlePrint}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
            }}
          >
            Export PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => openModal(null)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
            }}
          >
            Add User
          </Button>
        </Stack>
      </Stack>

      {/* ── Summary chips ── */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <Chip
          icon={<PeopleAltIcon sx={{ fontSize: 16 }} />}
          label={`${users.length} Total`}
          sx={{ bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 600 }}
        />
        <Chip
          label={`${activeCount} Active`}
          sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 600 }}
        />
        <Chip
          label={`${inactiveCount} Inactive`}
          sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 600 }}
        />
        {filtersActive && (
          <Chip
            label={`${filteredUsers.length} Shown`}
            sx={{ bgcolor: '#fffbeb', color: '#b45309', fontWeight: 600 }}
          />
        )}
      </Stack>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      {/* ── Toolbar: search + filters (Enhancement 2) ── */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: 2,
          borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          alignItems={{ md: 'center' }}
        >
          <TextField
            size="small"
            placeholder="Search by name, email, or username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              minWidth: 220,
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Roles</MenuItem>
                {ROLES.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Genders</MenuItem>
                {GENDERS.map((g) => (
                  <MenuItem key={g} value={g}>
                    {labelize(g)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Reset filters">
              <span>
                <IconButton
                  onClick={resetFilters}
                  disabled={!filtersActive}
                  sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                    color: filtersActive ? '#3b82f6' : '#94a3b8',
                  }}
                >
                  <RestartAltIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </Stack>
        {filtersActive && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1.5, color: '#64748b' }}
            flexWrap="wrap"
            useFlexGap
          >
            <FilterListIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">
              Showing {filteredUsers.length} of {users.length} users
            </Typography>
          </Stack>
        )}
      </Paper>

      {/* ── DataGrid ── */}
      <Card
        ref={printRef}
        sx={{
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
      >
        {users.length > 0 ? (
          <Box sx={{ height: { xs: 460, sm: 560 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              getRowHeight={() => 56}
              sx={{
                border: 'none',
                minWidth: 0,
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8fafc',
                  fontWeight: 700,
                  fontSize: 13,
                },
                '& .MuiDataGrid-row:hover': { backgroundColor: '#f0f7ff' },
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid #f1f5f9',
                },
                borderRadius: 3,
              }}
            />
          </Box>
        ) : (
          <Alert severity="info" sx={{ m: 2 }}>
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Card>

      {/* ── Add / Edit Dialog ── */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {modal.id ? 'Edit User' : 'Add User'}
          </DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {GENDERS.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {ROLES.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>

              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                })}
              />

              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} sx={{ textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: '#3b82f6',
                '&:hover': { bgcolor: '#2563eb' },
              }}
            >
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
