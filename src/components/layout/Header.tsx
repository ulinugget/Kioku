import { Box, Text } from '@radix-ui/themes';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }
  
  return (
    <Box
      as="header"
      className="sticky top-0 z-50"
    >
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="flex h-16 items-center justify-between">
          <Box className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/src/assets/KIOKU.svg" alt="Kioku" className="h-6" />
            </Link>
          </Box>
          <Box className="flex items-center gap-4">
            {user ? (
              <>
                <Text size="2" color="sage" className="hidden sm:block">
                  {user.user_metadata?.full_name || user.email}
                </Text>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm">Iniciar sesión</Button>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}