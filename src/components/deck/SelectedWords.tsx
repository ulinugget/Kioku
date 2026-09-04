import { Box, Flex, Text, Badge } from '@radix-ui/themes';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Word } from '../../types';
import { Trash2, GripVertical } from 'lucide-react';

interface SelectedWordsProps {
  words: Word[];
  onRemoveWord: (wordId: string) => void;
}

export function SelectedWords({ words, onRemoveWord }: SelectedWordsProps) {
  if (words.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Palabras seleccionadas</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-8">
          <Box className="text-center text-sage-9">
            <GripVertical className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <Text>No hay palabras seleccionadas</Text>
            <Text size="2" className="mt-1">
              Busca palabras a la izquierda y haz clic en "Añadir"
            </Text>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Flex className="justify-between items-center">
          <CardTitle>Palabras seleccionadas ({words.length})</CardTitle>
        </Flex>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <Flex direction="column" gap="2">
          {words.map((word) => (
            <Box
              key={word.id}
              className="flex items-center justify-between p-3 rounded-lg bg-sage-1 border border-sage-3"
            >
              <Box className="flex items-center gap-3 flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-sage-9 hover:text-sage-11 shrink-0"
                  aria-label="Arrastrar"
                >
                  <GripVertical className="h-4 w-4" />
                </Button>
                <Box className="flex-1 min-w-0">
                  <Flex className="items-baseline gap-2 mb-1" wrap>
                    <Text weight="bold" size="3" className="truncate">{word.original}</Text>
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
              </Box>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveWord(word.id)}
                aria-label={`Eliminar ${word.original}`}
                className="text-red-9 hover:text-red-10 hover:bg-red-2 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}