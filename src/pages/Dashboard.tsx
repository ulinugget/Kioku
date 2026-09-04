import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { DeckCard } from '../components/deck/DeckCard';
import { Plus, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDecks } from '../hooks/useDecks';

export function Dashboard() {
  const { decks, loading, error, deleteDeck } = useDecks();

  return (
    <Box className="min-h-screen bg-background">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Flex className="items-center mb-8">
          <Box>
            <Heading size="2" weight="bold" className="text-sage-12">
              Mis Decks
            </Heading>
            <Text size="2" color="sage" className="mt-1">
              {decks.length === 0
                ? 'No tienes decks aún. Crea tu primero.'
                : `${decks.length} deck${decks.length !== 1 ? 's' : ''} creado${decks.length !== 1 ? 's' : ''}`}
            </Text>
          </Box>
        </Flex>

        {loading ? (
          <Text size="2" color="sage" className="mt-6 block text-center">
            Cargando tus decks...
          </Text>
        ) : error ? (
          <Text size="2" color="red" className="mt-6 block text-center">
            No se pudieron cargar los decks: {error}
          </Text>
        ) : (
          <Container>
            <Link to="/decks/new">
              <Box
                className="w-full border-2 border-dashed border-[#1E1E1E] bg-background rounded-xl py-8 flex items-center justify-center mb-4"
              >
                <Button variant="ghost" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir deck
                </Button>
              </Box>
            </Link>

            {decks.length === 0 ? (
              <Box className="flex flex-col items-center gap-4 py-12 px-8 text-center">
                <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-2 text-lime-11">
                  <BookOpen className="h-8 w-8" />
                </Box>
                <Box>
                  <Heading size="3" weight="bold" className="text-sage-12">
                    No hay decks todavía
                  </Heading>
                  <Text size="2" color="sage" className="mt-2 max-w-md">
                    Crea tu primer deck de palabras para empezar a aprender. 
                    Podrás buscar palabras, añadirlas y repasarlas cuando quieras.
                  </Text>
                </Box>
              </Box>
            ) : (
              <Box className="grid grid-cols-[repeat(auto-fill,215px)] gap-4">
                {decks.map((deck) => (
                  <DeckCard
                    key={deck.id}
                    deck={deck}
                    onDelete={deleteDeck}
                    onView={() => {}}
                  />
                ))}
              </Box>
            )}
          </Container>
        )}
      </Box>
    </Box>
  );
}