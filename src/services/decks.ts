import { supabase } from '../lib/supabase';

export interface CreateDeckInput {
  title: string;
  description: string;
  shape?: string;
  bgColor?: string;
  fgColor?: string;
}

export interface CreateDeckResult {
  id: string | null;
  error: string | null;
}

export async function createDeck({ title, description, shape, bgColor, fgColor }: CreateDeckInput): Promise<CreateDeckResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { id: null, error: 'No hay una sesión iniciada. Vuelve a iniciar sesión.' };
  }

  const { data, error } = await supabase
    .from('decks')
    .insert({
      title,
      description,
      shape,
      bg_color: bgColor,
      fg_color: fgColor,
      teacher_id: user.id,
    })
    .select('id')
    .single();

  if (error) {
    return { id: null, error: error.message };
  }

  return { id: data.id, error: null };
}

export interface InsertCardsInput {
  deckId: string;
  cards: { term: string; definition: string }[];
}

export interface InsertCardsResult {
  count: number | null;
  error: string | null;
}

export async function insertCards({ deckId, cards }: InsertCardsInput): Promise<InsertCardsResult> {
  if (cards.length === 0) {
    return { count: 0, error: null };
  }

  const { data, error } = await supabase
    .from('cards')
    .insert(
      cards.map((card) => ({
        deck_id: deckId,
        term: card.term,
        definition: card.definition,
      }))
    )
    .select('id');

  if (error) {
    return { count: null, error: error.message };
  }

  return { count: data.length, error: null };
}

export interface DeckCardRow {
  id: string;
}

export interface DeckRow {
  id: string;
  title: string;
  description: string | null;
  shape: string | null;
  bg_color: string | null;
  fg_color: string | null;
  created_at: string;
  cards: { id: string; term: string; definition: string }[];
}

export interface FetchMyDecksResult {
  decks: DeckRow[];
  error: string | null;
}

export async function fetchMyDecks(): Promise<FetchMyDecksResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { decks: [], error: 'No hay una sesión iniciada. Vuelve a iniciar sesión.' };
  }

  const { data, error } = await supabase
    .from('decks')
    .select('id, title, description, shape, bg_color, fg_color, created_at, cards(id, term, definition)')
    .eq('teacher_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return { decks: [], error: error.message };
  }

  return { decks: (data ?? []) as DeckRow[], error: null };
}

export interface DeleteDeckResult {
  error: string | null;
}

export async function deleteDeckRemote(deckId: string): Promise<DeleteDeckResult> {
  const { error } = await supabase.from('decks').delete().eq('id', deckId);
  return { error: error?.message ?? null };
}
