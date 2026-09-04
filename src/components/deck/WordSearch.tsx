import { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Flex, Text, Badge } from '@radix-ui/themes';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { searchJapaneseWords, japaneseWords } from '../../utils/japaneseWords';
import { searchDictionaryWords } from '../../services/jotobaApi';
import { Word } from '../../types';
import { Plus, Search, Loader2 } from 'lucide-react';

interface WordSearchProps {
  selectedWords: Word[];
  onAddWord: (word: Word) => void;
  language: string;
}

export function WordSearch({ selectedWords, onAddWord, language }: WordSearchProps) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [apiResults, setApiResults] = useState<Word[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchApiResults = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setApiResults([]);
      return;
    }

    setIsLoadingApi(true);
    try {
      const results = await searchDictionaryWords(searchQuery);
      setApiResults(results);
    } catch (error) {
      console.error('Failed to fetch from Jotoba:', error);
      setApiResults([]);
    } finally {
      setIsLoadingApi(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApiResults(debouncedQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedQuery, fetchApiResults]);

  const localResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return showAll ? japaneseWords : [];
    }
    return searchJapaneseWords(debouncedQuery);
  }, [debouncedQuery, showAll]);

  const results = debouncedQuery.trim() ? apiResults : localResults;
  const isSearching = query !== debouncedQuery || isLoadingApi;

  const isSelected = (word: Word) => selectedWords.some(w => w.id === word.id);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Flex className="justify-between items-center gap-4">
          <CardTitle>Buscar palabras</CardTitle>
          <Badge color="lime" variant="surface">
            {language}
          </Badge>
        </Flex>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <Flex direction="column" gap="3" className="flex-1">
          <Box>
            <label className="block text-sm font-medium text-sage-11 mb-1.5">Buscar palabras</label>
            <Box className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sage-9" aria-hidden="true" />
              <Input
                placeholder="Buscar por kanji, lectura o significado..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sage-9 animate-spin" aria-hidden="true" />
              )}
            </Box>
            <Flex className="mt-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Ocultar todas' : 'Ver todas las palabras'}
              </Button>
            </Flex>
          </Box>

          <Box className="flex-1 overflow-y-auto min-h-0">
            {results.length === 0 && !isSearching && debouncedQuery ? (
              <Box className="flex flex-col items-center justify-center h-full text-sage-9">
                <Search className="h-12 w-12 mb-2 opacity-50" />
                <Text>No se encontraron palabras</Text>
                <Text size="2">Intenta con otra búsqueda</Text>
              </Box>
            ) : results.length === 0 && !debouncedQuery && !showAll ? (
              <Box className="flex flex-col items-center justify-center h-full text-sage-9">
                <Search className="h-12 w-12 mb-2 opacity-50" />
                <Text>Escribe para buscar palabras</Text>
                <Text size="2">O haz clic en "Ver todas las palabras"</Text>
              </Box>
            ) : (
              <Flex direction="column" gap="2">
                {results.map((word) => (
                  <Box
                    key={word.id}
                    className={
                      isSelected(word)
                        ? 'flex items-center justify-between p-3 rounded-lg border bg-lime-1 border-lime-5'
                        : 'flex items-center justify-between p-3 rounded-lg border bg-white border-sage-3 hover:bg-sage-1 transition-colors'
                    }
                  >
                    <Box className="flex-1 min-w-0 mr-3">
                      <Flex className="items-baseline gap-2 mb-1" wrap>
                        <Text weight="bold" size="3">{word.original}</Text>
                        {word.reading && (
                          <Text color="sage" size="2">({word.reading})</Text>
                        )}
                        <Badge variant="surface" color="sage" size="1">
                          {word.meaning}
                        </Badge>
                      </Flex>
                      {word.examples && word.examples.length > 0 && (
                        <Text size="2" color="sage" className="truncate">
                          Ej: {word.examples[0]}
                        </Text>
                      )}
                    </Box>
                    {isSelected(word) ? (
                      <Badge color="lime" variant="surface" size="2">
                        Añadida
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAddWord(word)}
                        aria-label={`Añadir ${word.original}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        </Flex>
      </CardContent>
    </Card>
  );
}