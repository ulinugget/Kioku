import { useState, type FormEvent } from 'react';
import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    navigate('/');
  }

  return (
    <Box className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Heading as="h1" size="4" weight="bold" className="text-sage-12">
            Iniciar sesión
          </Heading>
          <CardDescription>
            Accede a tu cuenta de Kioku.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Flex direction="column" gap="2">
              <Text as="label" size="2" weight="medium" className="text-sage-11">
                Email
              </Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text as="label" size="2" weight="medium" className="text-sage-11">
                Contraseña
              </Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </Flex>

            {error && (
              <Text size="2" color="red" className="block">
                {error}
              </Text>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          <Text size="2" color="sage" className="mt-6 block text-center">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-lime-9 font-medium hover:underline">
              Regístrate
            </Link>
          </Text>
        </CardContent>
      </Card>
    </Box>
  );
}
