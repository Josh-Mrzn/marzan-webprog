export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;
  return {
    token,
    type: localStorage.getItem('type') || 'editor',
    firstName: localStorage.getItem('firstName') || 'User',
    lastName: localStorage.getItem('lastName') || '',
    email: localStorage.getItem('email') || '',
  };
};

export const clearSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('type');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('email');
};

export const isAdmin = () => getCurrentUser()?.type === 'admin';
export const isEditor = () => getCurrentUser()?.type === 'editor';
