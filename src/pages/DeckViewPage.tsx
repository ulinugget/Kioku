import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@radix-ui/themes';
import { DeckView } from '../components/deck/DeckView';
import { useDecks } from '../hooks/useDecks';
import { Deck } from '../types';

export function DeckViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { decks, deleteDeck } = useDecks();

  const deck = id ? decks.find(d => d.id === id) || null : null;

  if (!deck) {
    return (
      <Box className="min-h-screen bg-background flex items-center justify-center">
        <Box className="text-center">
          <Box className="animate-spin h-8 w-8 border-4 border-lime-9 border-t-transparent rounded-full mx-auto" />
          <Box className="mt-4 text-sage-9">Cargando...</Box>
        </Box>
      </Box>
    );
  }

  const handleEdit = (deckToEdit: Deck) => {
    navigate(`/decks/${deckToEdit.id}/edit`);
  };

  return (
    <Box className="min-h-screen bg-background py-8 px-4">
      <DeckView
        deck={deck}
        onBack={() => navigate('/')}
        onEdit={handleEdit}
        onDelete={deleteDeck}
      />
    </Box>
  );
}