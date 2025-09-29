import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth-store";


export default function AuthSection() {
  const { user, isAuthenticated } = useAuthStore();
  const { 
    login, 
    logout, 
    isLoggingIn, 
    loginError 
  } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="auth-section p-4 bg-green-100 rounded">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Welcome, {user.username || user.name}!</p>
            <p className="text-sm text-gray-600">Account ID: {user.id}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-section p-4 bg-gray-100 rounded">
      <p className="mb-2">Login to access your watchlist and favorites</p>
      <button
        onClick={login}
        disabled={isLoggingIn}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoggingIn ? 'Redirecting...' : 'Login with TMDB'}
      </button>
      {loginError && (
        <p className="text-red-500 text-sm mt-2">
          Login failed. Please try again.
        </p>
      )}
    </div>
  );
}
