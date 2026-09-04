import { supabase } from '../lib/supabase';
import type { Word } from '../types';

export interface DictionaryEntry {
  kanji: string[];
  kana: string[];
  gloss_es: string[];
  gloss_en: string[];
  pos: string[];
  is_common: boolean;
}

function isJapanese(text: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text);
}

function adaptEntry(entry: DictionaryEntry, index: number): Word {
  const original = entry.kanji?.[0] ?? entry.kana?.[0] ?? '';
  const reading = entry.kanji.length > 0 ? entry.kana?.[0] : undefined;
  const meaning = entry.gloss_es?.join(', ') ?? '';

  return {
    id: `supabase-${Date.now()}-${index}`,
    original,
    reading,
    meaning,
  };
}

export async function searchDictionaryWords(query: string): Promise<Word[]> {
  if (!query.trim()) return [];

  try {
    let rpcQuery = supabase
      .from('dictionary_entries')
      .select('kanji, kana, gloss_es, gloss_en, pos, is_common')
      .limit(30);

    if (isJapanese(query)) {
      rpcQuery = rpcQuery.or(
        `kanji.cs.{${query}},kana.cs.{${query}}`
      );
    } else {
      rpcQuery = rpcQuery.or(
        `gloss_es.cs.{${query}},gloss_en.cs.{${query}}`
      );
    }

    const { data, error } = await rpcQuery;

    if (error) {
      console.error('Supabase query error:', error);
      return [];
    }

    return (data ?? []).map((entry, i) => adaptEntry(entry, i));
  } catch (error) {
    console.error('Error searching dictionary:', error);
    return [];
  }
}
