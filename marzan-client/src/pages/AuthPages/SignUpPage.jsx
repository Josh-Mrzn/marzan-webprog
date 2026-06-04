import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const selectClasses = `${inputClasses} appearance-none`;

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const initialForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
  type: 'viewer',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Please enter a valid email address.';
    }
    if (!/^\d+$/.test(form.age)) {
      return 'Age must be a number.';
    }
    if (!/^\d{11}$/.test(form.contactNumber)) {
      return 'Contact number must be 11 digits.';
    }
    if (/\s/.test(form.username)) {
      return 'Username must not contain spaces.';
    }
    if (form.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await createUser({
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        address: form.address.trim(),
        isActive: true,
      });

      setSuccess('Account created successfully. Redirecting to sign-in…');
      setTimeout(() => navigate('/auth/signin', { replace: true }), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to create your account. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Create your account to start managing pets, articles, and adoption stories.
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-zinc-700">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="text"
              inputMode="numeric"
              value={form.age}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-sm font-medium text-zinc-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className={selectClasses}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contactNumber" className="text-sm font-medium text-zinc-700">
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="09XXXXXXXXX"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-zinc-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="type" className="text-sm font-medium text-zinc-700">
              Account Type
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-medium text-zinc-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={2}
            value={form.address}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className={`${actionButtonClassName} ${loading ? 'pointer-events-none opacity-70' : ''}`}
        >
          {loading ? 'Creating Account…' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
