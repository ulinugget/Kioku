import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@radix-ui/themes';
import { DeckForm } from '../components/deck/DeckForm';
import { createDeck, insertCards } from '../services/decks';
import { generateDeckColors } from '../utils/deckColors';
import type { Word } from '../types';

interface DeckData {
  title: string;
  translatedTitle: string;
  language: string;
  words: Word[];
  shape?: string;
}

export function NewDeck() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async (deckData: DeckData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const colors = generateDeckColors();

    const { id, error: deckError } = await createDeck({
      title: deckData.title,
      description: deckData.translatedTitle,
      shape: deckData.shape,
      bgColor: colors.bg,
      fgColor: colors.fg,
    });

    if (deckError || !id) {
      setLoading(false);
      setError(deckError ?? 'No se pudo crear el deck.');
      return;
    }

    const { count, error: cardsError } = await insertCards({
      deckId: id,
      cards: deckData.words.map((w) => ({
        term: w.original,
        definition: w.reading ? `${w.meaning} (${w.reading})` : w.meaning,
      })),
    });

    setLoading(false);

    if (cardsError) {
      setError(cardsError);
      return;
    }

    setSuccess(`Deck guardado con ${count ?? 0} ${(count ?? 0) === 1 ? 'carta' : 'cartas'}.`);

    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <Box className="min-h-screen bg-background py-8 px-4">
      {error && (
        <Box className="mx-auto max-w-6xl mb-4 p-3 rounded-md bg-red-1 border border-red-5 text-red-11 text-sm">
          {error}
        </Box>
      )}
      {success && (
        <Box className="mx-auto max-w-6xl mb-4 p-3 rounded-md bg-lime-1 border border-lime-5 text-lime-11 text-sm">
          {success}
        </Box>
      )}
      <DeckForm
        onSave={handleSave}
        onCancel={() => navigate('/')}
        submitting={loading}
      />
    </Box>
  );
}
