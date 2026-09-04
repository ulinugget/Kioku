import { useState, type FormEvent } from 'react';
import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { SelectField } from '../components/ui/Select';
import { useAuth } from '../contexts/AuthContext';

type Role = 'teacher' | 'student';

export function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!role) {
      setError('Selecciona si te registras como Profesor o Estudiante.');
      return;
    }

    setLoading(true);
    const result = await signUp(email, password, role, fullName);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (role === 'teacher') {
      navigate('/decks/new');
    } else {
      navigate('/');
    }
  }

  return (
    <Box className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Heading as="h1" size="4" weight="bold" className="text-sage-12">
            Crear cuenta
          </Heading>
          <CardDescription>
            Regístrate para empezar a usar Kioku.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Flex direction="column" gap="2">
              <Text as="label" size="2" weight="medium" className="text-sage-11">
                Nombre completo
              </Text>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre completo"
                required
              />
            </Flex>

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

            <Flex direction="column" gap="2">
              <Text as="label" size="2" weight="medium" className="text-sage-11">
                Te registras como
              </Text>
              <SelectField
                value={role}
                onValueChange={(value) => setRole(value as Role)}
                placeholder="Selecciona un rol"
                options={[
                  { value: 'teacher', label: 'Profesor' },
                  { value: 'student', label: 'Estudiante' },
                ]}
              />
            </Flex>

            {error && (
              <Text size="2" color="red" className="block">
                {error}
              </Text>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </form>

          <Text size="2" color="sage" className="mt-6 block text-center">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-lime-9 font-medium hover:underline">
              Inicia sesión
            </Link>
          </Text>
        </CardContent>
      </Card>
    </Box>
  );
}
