import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
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
import {
  createUser as createUserApi,
  deleteUser as deleteUserApi,
  fetchUsers,
  updateUser as updateUserApi,
} from '../../services/UserService';

const TYPES = ['admin', 'viewer'];
const GENDERS = ['male', 'female', 'other'];
const AVATAR_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899',
];

const getAvatarColor = (key) => {
  const seed = String(key || '')
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[seed % AVATAR_COLORS.length];
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const typeChipColor = {
  admin: { bg: '#eff6ff', color: '#3b82f6' },
  viewer: { bg: '#f1f5f9', color: '#64748b' },
};

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  type: 'viewer',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

function UsersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const printRef = useRef(null);

  const loadUsers = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { data } = await fetchUsers();
      const records = (data?.users || []).map((u) => ({ ...u, id: u._id || u.id }));
      setUsers(records);
    } catch (error) {
      setLoadError(
        error.response?.data?.message ||
          'Unable to load users. Please ensure the API server is running.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
    setFormError('');
    setShowPassword(false);
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user, password: '' } : { ...blankForm });
    setErrors({});
    setFormError('');
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

  const validate = () => {
    const nextErrors = {};
    const email = String(form.email || '').trim().toLowerCase();
    const username = String(form.username || '').trim().toLowerCase();
    const contact = String(form.contactNumber || '').trim();
    const age = String(form.age || '').trim();
    const password = form.password || '';

    const required = [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['type', 'Type'],
      ['username', 'Username'],
      ['address', 'Address'],
    ];

    required.forEach(([key, label]) => {
      if (!String(form[key] ?? '').trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!modal.id && !password) {
      nextErrors.password = 'Password is required.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contact)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
    }

    if (!nextErrors.username && /\s/.test(username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!nextErrors.password && password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (
      !nextErrors.email &&
      users.some((user) => user.id !== modal.id && user.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    if (
      !nextErrors.username &&
      users.some((user) => user.id !== modal.id && user.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: String(form.age).trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: !!form.isActive,
    };

    if (form.password) {
      payload.password = form.password;
    }

    setSubmitting(true);
    try {
      if (modal.id) {
        await updateUserApi(modal.id, payload);
      } else {
        await createUserApi(payload);
      }
      await loadUsers();
      closeModal();
    } catch (error) {
      setFormError(
        error.response?.data?.message || 'Unable to save the user. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (user) => {
    try {
      await updateUserApi(user.id, { isActive: !user.isActive });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)),
      );
    } catch (error) {
      setLoadError(
        error.response?.data?.message || 'Unable to update user status.',
      );
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.firstName} ${user.lastName}? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteUserApi(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (error) {
      setLoadError(
        error.response?.data?.message || 'Unable to delete the user.',
      );
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] ?? '',
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name] || '',
    fullWidth: true,
    ...extra,
  });

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !q ||
        (user.firstName || '').toLowerCase().includes(q) ||
        (user.lastName || '').toLowerCase().includes(q) ||
        (user.email || '').toLowerCase().includes(q) ||
        (user.username || '').toLowerCase().includes(q);
      const matchesType = filterType === 'all' || user.type === filterType;
      const matchesGender = filterGender === 'all' || user.gender === filterGender;
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && user.isActive) ||
        (filterStatus === 'inactive' && !user.isActive);
      return matchesSearch && matchesType && matchesGender && matchesStatus;
    });
  }, [users, search, filterType, filterGender, filterStatus]);

  const activeCount = users.filter((u) => u.isActive).length;
  const inactiveCount = users.length - activeCount;
  const filtersActive =
    search.trim() !== '' ||
    filterType !== 'all' ||
    filterGender !== 'all' ||
    filterStatus !== 'all';

  const resetFilters = () => {
    setSearch('');
    setFilterType('all');
    setFilterGender('all');
    setFilterStatus('all');
  };

  const handlePrint = () => {
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
        (u, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${u.firstName} ${u.lastName}</td>
            <td>${u.username}</td>
            <td>${u.email}</td>
            <td>${u.contactNumber}</td>
            <td>${labelize(u.type)}</td>
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
            body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #fff; color: #1f2937; }
            .report-shell { padding: 28px; }
            .report-header { margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid #d1d5db; }
            .report-header h1 { margin: 0 0 6px; font-size: 28px; font-weight: 700; }
            .report-header p { margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5; }
            .summary { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
            .summary .pill { padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; border: 1px solid #e5e7eb; background: #f9fafb; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; page-break-inside: auto; }
            thead { background: #f1f5f9; }
            th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e5e7eb; }
            th { font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.4px; font-size: 11px; }
            tr { page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Users Report</h1>
              <p>Directory snapshot of registered users with their types, contact details, and account status.</p>
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
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Type</th>
                    <th>Gender</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml || '<tr><td colspan="8" style="text-align:center;padding:24px;color:#6b7280">No users to export.</td></tr>'}
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

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => {
        const initial = (params.row.firstName || params.row.lastName || '?')[0].toUpperCase();
        return (
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ height: '100%' }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
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
    { field: 'age', headerName: 'Age', width: 80 },
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
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => {
        const cfg = typeChipColor[params.row.type] ?? typeChipColor.viewer;
        return (
          <Chip
            label={labelize(params.row.type)}
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
      minWidth: 240,
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
            onClick={() => toggleStatus(row)}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, boxShadow: 'none' }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(row)}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
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
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 2.5 }}
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

      {loadError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setLoadError('')}>
          {loadError}
        </Alert>
      )}

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
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ md: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by name, email, or username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 220, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
              <InputLabel>Type</InputLabel>
              <Select label="Type" value={filterType} onChange={(e) => setFilterType(e.target.value)} sx={{ borderRadius: 2 }}>
                <MenuItem value="all">All Types</MenuItem>
                {TYPES.map((t) => (
                  <MenuItem key={t} value={t}>
                    {labelize(t)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" value={filterGender} onChange={(e) => setFilterGender(e.target.value)} sx={{ borderRadius: 2 }}>
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
              <Select label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ borderRadius: 2 }}>
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
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: '#64748b' }} flexWrap="wrap" useFlexGap>
            <FilterListIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">
              Showing {filteredUsers.length} of {users.length} users
            </Typography>
          </Stack>
        )}
      </Paper>

      <Card
        ref={printRef}
        sx={{
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
            <CircularProgress size={32} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5 }}>
              Loading users…
            </Typography>
          </Stack>
        ) : users.length > 0 ? (
          <Box sx={{ height: { xs: 460, sm: 560 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
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
                '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #f1f5f9' },
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

      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {modal.id ? 'Edit User' : 'Add User'}
          </DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
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
                <TextField {...fieldProps('type', 'Type', { select: true })}>
                  {TYPES.map((t) => (
                    <MenuItem key={t} value={t}>
                      {labelize(t)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>

              <TextField
                {...fieldProps('password', modal.id ? 'New Password (optional)' : 'Password', {
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
                control={<Switch name="isActive" checked={!!form.isActive} onChange={handleChange} />}
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
              disabled={submitting}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: '#3b82f6',
                '&:hover': { bgcolor: '#2563eb' },
              }}
            >
              {submitting ? 'Saving…' : modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
