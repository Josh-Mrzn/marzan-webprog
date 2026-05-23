import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
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
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  createArticle as createArticleApi,
  deleteArticle as deleteArticleApi,
  fetchArticles,
  updateArticle as updateArticleApi,
} from '../../services/ArticleService';

const STATUSES = ['active', 'inactive'];

const slugify = (input) =>
  String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const blankForm = {
  slug: '',
  title: '',
  paragraphs: '',
  preview: '',
  imageUrl: '',
  status: 'active',
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadArticles = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { data } = await fetchArticles();
      const rows = (data?.articles || []).map((a, idx) => ({
        ...a,
        id: a._id || a.id || idx + 1,
      }));
      setArticles(rows);
    } catch (error) {
      setLoadError(
        error.response?.data?.message ||
          'Unable to load articles. Make sure the API server is running.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openCreate = () => {
    setModal({ open: true, id: null });
    setForm({ ...blankForm });
    setErrors({});
    setFormError('');
  };

  const openEdit = (article) => {
    setModal({ open: true, id: article.id });
    setForm({
      slug: article.slug || '',
      title: article.title || '',
      paragraphs: Array.isArray(article.paragraphs)
        ? article.paragraphs.join('\n\n')
        : '',
      preview: article.preview || '',
      imageUrl: article.imageUrl || '',
      status: article.status || 'active',
    });
    setErrors({});
    setFormError('');
  };

  const closeModal = () => setModal({ open: false, id: null });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'title' && !modal.id && !prev.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.slug.trim()) nextErrors.slug = 'Slug is required.';
    if (form.slug && !/^[a-z0-9-]+$/.test(form.slug.trim())) {
      nextErrors.slug = 'Slug may only contain lowercase letters, numbers, and dashes.';
    }
    const paragraphs = form.paragraphs
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length === 0) {
      nextErrors.paragraphs = 'At least one paragraph is required.';
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const paragraphs = form.paragraphs
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      slug: slugify(form.slug),
      title: form.title.trim(),
      paragraphs,
      preview: form.preview.trim() || paragraphs[0]?.slice(0, 240) || '',
      imageUrl: form.imageUrl.trim(),
      status: form.status,
    };

    setSubmitting(true);
    setFormError('');
    try {
      if (modal.id) {
        await updateArticleApi(modal.id, payload);
      } else {
        await createArticleApi(payload);
      }
      await loadArticles();
      closeModal();
    } catch (error) {
      setFormError(
        error.response?.data?.message || 'Unable to save the article.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (article) => {
    const nextStatus = article.status === 'active' ? 'inactive' : 'active';
    try {
      await updateArticleApi(article.id, { status: nextStatus });
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, status: nextStatus } : a)),
      );
    } catch (error) {
      setLoadError(
        error.response?.data?.message || 'Unable to update article status.',
      );
    }
  };

  const handleDelete = async (article) => {
    if (!window.confirm(`Delete article "${article.title}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteArticleApi(article.id);
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
    } catch (error) {
      setLoadError(
        error.response?.data?.message || 'Unable to delete the article.',
      );
    }
  };

  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesSearch =
        !q ||
        (article.title || '').toLowerCase().includes(q) ||
        (article.slug || '').toLowerCase().includes(q) ||
        (article.preview || '').toLowerCase().includes(q);
      const matchesStatus =
        filterStatus === 'all' || article.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [articles, search, filterStatus]);

  const activeCount = articles.filter((a) => a.status === 'active').length;
  const inactiveCount = articles.length - activeCount;
  const filtersActive = search.trim() !== '' || filterStatus !== 'all';

  const resetFilters = () => {
    setSearch('');
    setFilterStatus('all');
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

  const columns = [
    {
      field: 'serial',
      headerName: 'ID',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#475569' }}>
          {(params.row.slug || '').slice(0, 6).toUpperCase().padEnd(6, '·')}
        </Typography>
      ),
    },
    { field: 'slug', headerName: 'Slug', flex: 0.8, minWidth: 160 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 110,
      valueGetter: (_, row) => (Array.isArray(row.paragraphs) ? row.paragraphs.length : 0),
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1,
      minWidth: 220,
      renderCell: ({ row }) => (
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#475569',
          }}
        >
          {row.preview || (row.paragraphs?.[0] ?? '')}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={labelize(row.status)}
          sx={{
            fontWeight: 600,
            bgcolor: row.status === 'active' ? '#dcfce7' : '#f1f5f9',
            color: row.status === 'active' ? '#16a34a' : '#64748b',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 280,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon sx={{ fontSize: 16 }} />}
            onClick={() => openEdit(row)}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.status === 'active' ? 'warning' : 'success'}
            onClick={() => handleToggleStatus(row)}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, boxShadow: 'none' }}
          >
            {row.status === 'active' ? 'Disable' : 'Enable'}
          </Button>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDelete(row)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
            Articles
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage editorial content surfaced on the public Article List page.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={openCreate}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
            }}
          >
            Add Article
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <Chip
          icon={<ArticleIcon sx={{ fontSize: 16 }} />}
          label={`${articles.length} Total`}
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
            label={`${filteredArticles.length} Shown`}
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
            placeholder="Search articles…"
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
          <Stack direction="row" spacing={1.5}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status filter</InputLabel>
              <Select
                label="Status filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                {STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {labelize(s)}
                  </MenuItem>
                ))}
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
              Showing {filteredArticles.length} of {articles.length} articles
            </Typography>
          </Stack>
        )}
      </Paper>

      <Card
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
              Loading articles…
            </Typography>
          </Stack>
        ) : articles.length > 0 ? (
          <Box sx={{ height: { xs: 460, sm: 560 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
              getRowHeight={() => 60}
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
            No articles yet. Use Add Article to publish your first piece.
          </Alert>
        )}
      </Card>

      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {modal.id ? 'Edit Article' : 'Add Article'}
          </DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField {...fieldProps('title', 'Title')} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('slug', 'Slug', { helperText: errors.slug || 'Lowercase, hyphen-separated. Used in the public URL.' })} />
                <TextField {...fieldProps('status', 'Status', { select: true })}>
                  {STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {labelize(s)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField
                {...fieldProps('imageUrl', 'Cover Image URL (optional)', {
                  placeholder: 'https://…',
                })}
              />
              <TextField
                {...fieldProps('preview', 'Preview (optional)', {
                  helperText: 'Short blurb shown on cards. Defaults to first paragraph.',
                  multiline: true,
                  rows: 2,
                })}
              />
              <TextField
                {...fieldProps('paragraphs', 'Paragraphs', {
                  multiline: true,
                  rows: 8,
                  helperText:
                    errors.paragraphs ||
                    'Separate paragraphs with a blank line.',
                  placeholder:
                    'First paragraph goes here.\n\nSecond paragraph here.\n\nThird paragraph here.',
                })}
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
              {submitting ? 'Saving…' : modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
