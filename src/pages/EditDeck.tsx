import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@radix-ui/themes';
import { DeckForm } from '../components/deck/DeckForm';
import { useDecks } from '../hooks/useDecks';

export function EditDeck() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { decks, deleteDeck, addDeck } = useDecks();

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

  const handleSave = (deckData: { title: string; translatedTitle: string; language: string; words: any[]; shape?: string }) => {
    deleteDeck(deck.id);
    addDeck({
      ...deckData,
      bgColor: deck.bgColor,
      fgColor: deck.fgColor,
    });
    navigate('/');
  };

  return (
    <Box className="min-h-screen bg-background py-8 px-4">
      <DeckForm
        onSave={handleSave}
        onCancel={() => navigate(`/decks/${deck.id}`)}
        initialData={{
          title: deck.title,
          translatedTitle: deck.translatedTitle,
          language: deck.language,
          words: deck.words,
          shape: deck.shape,
        }}
      />
    </Box>
  );
}