import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

// ── Helpers ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899'];
const getAvatarColor = (id) => AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];

const roleConfig = {
  Admin: { color: 'primary', variant: 'filled' },
  Editor: { color: 'secondary', variant: 'outlined' },
  Viewer: { color: 'default', variant: 'outlined' },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const allRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, email: 'jon.snow@example.com', role: 'Admin', status: 'Active' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, email: 'cersei.l@example.com', role: 'Editor', status: 'Active' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, email: 'jaime.l@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, email: 'arya.stark@example.com', role: 'Viewer', status: 'Active' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, email: 'dany@example.com', role: 'Admin', status: 'Active' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, email: 'mel@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'ferrara@example.com', role: 'Editor', status: 'Active' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'rossini@example.com', role: 'Viewer', status: 'Active' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'harvey.r@example.com', role: 'Admin', status: 'Active' },
];

// ── Columns ───────────────────────────────────────────────────────────────────

const columns = [
  {
    field: 'avatar',
    headerName: '',
    width: 52,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const initial = (params.row.firstName || params.row.lastName || '?')[0].toUpperCase();
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
        </Box>
      );
    },
  },
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'firstName', headerName: 'First Name', width: 120, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 120, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 80, editable: true },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 200, editable: true },
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
    renderCell: (params) => {
      const cfg = roleConfig[params.value] ?? roleConfig.Viewer;
      return (
        <Chip
          label={params.value}
          color={cfg.color}
          variant={cfg.variant}
          size="small"
          sx={{ fontWeight: 600, fontSize: 12 }}
        />
      );
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: 12,
          bgcolor: params.value === 'Active' ? '#dcfce7' : '#f1f5f9',
          color: params.value === 'Active' ? '#16a34a' : '#64748b',
        }}
      />
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 160,
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

function UsersPage() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [search, setSearch] = useState('');

  const filteredRows = allRows.filter((r) => {
    const q = search.toLowerCase();
    return (
      (r.firstName || '').toLowerCase().includes(q) ||
      (r.lastName || '').toLowerCase().includes(q) ||
      (r.email || '').toLowerCase().includes(q) ||
      (r.role || '').toLowerCase().includes(q)
    );
  });

  const activeCount = allRows.filter((r) => r.status === 'Active').length;
  const inactiveCount = allRows.length - activeCount;

  return (
    <Box>
      {/* ── Page header ── */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#1e293b">
            Users
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage and monitor all registered users.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
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

      {/* ── Summary chips ── */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
        <Chip
          icon={<PeopleAltIcon sx={{ fontSize: 16 }} />}
          label={`${allRows.length} Total`}
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
      </Stack>

      {/* ── Toolbar ── */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={1.5} sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search users…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: '100%', sm: 300 },
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
        {selectionModel.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Delete ({selectionModel.length})
          </Button>
        )}
      </Stack>

      {/* ── DataGrid ── */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Box sx={{ height: 560 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(ids) => setSelectionModel(ids)}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8fafc',
                fontWeight: 700,
                fontSize: 13,
              },
              '& .MuiDataGrid-row:hover': { backgroundColor: '#f0f7ff' },
              '& .MuiDataGrid-row.Mui-selected': { backgroundColor: '#eff6ff' },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #f1f5f9',
              },
              borderRadius: 3,
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}

export default UsersPage;
