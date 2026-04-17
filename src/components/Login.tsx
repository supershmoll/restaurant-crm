import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/useLogin';
import { saveAuth } from '@/features/auth/authUtils';

export function Login() {

  const [username, setUsername] = useState('emilys'); 
  const [password, setPassword] = useState('emilyspass');
  const [rememberMe, setRememberMe] = useState(false);
  

  const navigate = useNavigate();
  const loginMutation = useLogin();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {

          saveAuth(data.token, data, rememberMe);
          const isAdmin = data.role === 'admin' || data.role === 'moderator';
          navigate({ to: isAdmin ? '/admin/analytics' : '/employee/tables' });
        },
      }
    );
  };

  return (
    <section className="relative min-h-dvh overflow-hidden bg-background px-4 py-10 text-text">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,theme(colors.occupied-background),transparent_55%),radial-gradient(900px_circle_at_80%_20%,theme(colors.reserved-background),transparent_55%),linear-gradient(to_bottom,theme(colors.background-secondary),theme(colors.background))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 size-80 rounded-full bg-occupied-background/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-reserved-background/70 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-md flex-col gap-5 rounded-2xl border border-border-color bg-background-secondary/80 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background-secondary/70">
        <div>
          <h1 className="mt-1 text-2xl font-semibold">Sign in</h1>
          <p className="mt-1 text-sm text-text/60">
            Welcome back. Please enter your credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {loginMutation.isError && (
            <div className="text-sm text-red-500 bg-red-500/10 p-2 rounded-lg text-center">
              Invalid username or password
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={loginMutation.isPending}
              className="h-10 rounded-lg border border-border-color bg-background px-3 text-sm outline-none transition-colors placeholder:text-text/40 focus:border-dark-button disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loginMutation.isPending}
              className="h-10 rounded-lg border border-border-color bg-background px-3 text-sm outline-none transition-colors placeholder:text-text/40 focus:border-dark-button disabled:opacity-50"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-text/70 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded border-border-color accent-dark-button cursor-pointer"
            />
            Remember me
          </label>

          <Button 
            type="submit" 
            className="h-10"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Login'}
          </Button>
        </form>
      </div>
    </section>
  );
}