import { useState, useEffect, useCallback } from 'react';
import { Deck } from '../types';
import { generateDeckColors } from '../utils/deckColors';
import {
  fetchMyDecks,
  deleteDeckRemote,
  createDeck,
  insertCards,
  type DeckRow,
} from '../services/decks';

const FALLBACK_BG = '#A7FFF5';
const FALLBACK_FG = '#C400EB';

function toDeck(row: DeckRow): Deck {
  return {
    id: row.id,
    title: row.title,
    translatedTitle: row.description ?? '',
    language: 'Japonés',
    words: row.cards.map((c) => ({
      id: c.id,
      original: c.term,
      meaning: c.definition,
    })),
    shape: row.shape ?? undefined,
    bgColor: row.bg_color ?? FALLBACK_BG,
    fgColor: row.fg_color ?? FALLBACK_FG,
    createdAt: new Date(row.created_at),
  };
}

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDecks = useCallback(async () => {
    const { decks, error } = await fetchMyDecks();
    setDecks(decks.map(toDeck));
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadDecks();
  }, [loadDecks]);

  const addDeck = async (deck: Omit<Deck, 'id' | 'createdAt'>) => {
    const colors = deck.bgColor && deck.fgColor
      ? { bg: deck.bgColor, fg: deck.fgColor }
      : generateDeckColors();

    const { id, error } = await createDeck({
      title: deck.title,
      description: deck.translatedTitle,
      shape: deck.shape,
      bgColor: colors.bg,
      fgColor: colors.fg,
    });
    if (error || !id) return null;

    const { error: cardsError } = await insertCards({
      deckId: id,
      cards: deck.words.map((w) => ({
        term: w.original,
        definition: w.reading ? `${w.meaning} (${w.reading})` : w.meaning,
      })),
    });
    if (cardsError) return null;

    await loadDecks();
    return id;
  };

  const deleteDeck = async (id: string) => {
    const { error } = await deleteDeckRemote(id);
    if (!error) {
      setDecks(prev => prev.filter(d => d.id !== id));
    }
  };

  return { decks, loading, error, addDeck, deleteDeck };
}
