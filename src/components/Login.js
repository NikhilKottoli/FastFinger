import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import Button from './ui/button';
import Input from './ui/input';
import Label from './ui/label';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading state

    const endpoint = isLogin ? '/login' : '/register';
    const payload = isLogin 
      ? { email, password } 
      : { email, password }; // Only email and password are included for registration

    // Validate inputs for login and registration
    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError('Please fill in all fields');
      setLoading(false); // Reset loading state
      return; 
    }
    
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return; 
    }

    try {
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json(); // Assuming the response is in JSON format
      console.log(data);

      if (isLogin) {
        setIsLoggedIn(true); // Update the login state
        localStorage.setItem('userId', data.user.id);
        navigate('/home'); // Navigate to home after successful login
      } else {
        // Handle successful registration
        setIsLoggedIn(true); // Automatically log the user in after registration
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('email', data.user.email);
        navigate('/home'); // Navigate to home after successful registration
      }

    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail(''); // Clear email field
    setPassword(''); // Clear password field
    setConfirmPassword(''); // Clear confirm password field
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">FastFingers</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                aria-invalid={error ? "true" : "false"} // Accessibility enhancement
                aria-describedby="email-error"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : (isLogin ? 'Sign in' : 'Sign up')}
              </Button>
            </div>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription id="email-error">{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6">
            <Button variant="link" onClick={toggleMode} className="w-full">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>

          {isLogin && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <Button variant="outline" className="w-full">
                    <span className="sr-only">Sign in with Facebook</span>
                    {/* Facebook SVG */}
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full">
                    <span className="sr-only">Sign in with Twitter</span>
                    {/* Twitter SVG */}
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full">
                    <span className="sr-only">Sign in with GitHub</span>
                    {/* GitHub SVG */}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
