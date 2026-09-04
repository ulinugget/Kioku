import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Box } from '@radix-ui/themes';
import { cn } from './components/utils/cn';
import { Header } from './components/layout/Header';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { NewDeck } from './pages/NewDeck';
import { DeckViewPage } from './pages/DeckViewPage';
import { EditDeck } from './pages/EditDeck';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function Sidebar() {
  const location = useLocation();
  return (
    <Box className="w-48 shrink-0 p-4">
      <Link
        to="/"
        className={cn(
          'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          location.pathname === '/'
            ? 'bg-lime-9 text-white'
            : 'text-sage-11 hover:bg-sage-2 hover:text-sage-12'
        )}
      >
        Mis Decks
      </Link>
    </Box>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Box className="min-h-screen bg-background">
      <Header />
      <Box className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/decks/new"
              element={
                <ProtectedRoute>
                  <NewDeck />
                </ProtectedRoute>
              }
            />
            <Route
              path="/decks/:id"
              element={
                <ProtectedRoute>
                  <DeckViewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/decks/:id/edit"
              element={
                <ProtectedRoute>
                  <EditDeck />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
