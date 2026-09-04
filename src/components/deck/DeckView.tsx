import { Box, Flex, Text, Badge, Separator } from '@radix-ui/themes';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Deck } from '../../types';
import { ArrowLeft, Edit, Trash2, BookOpen } from 'lucide-react';
import { cn } from '../../components/utils/cn';

interface DeckViewProps {
  deck: Deck;
  onBack: () => void;
  onEdit?: (deck: Deck) => void;
  onDelete: (id: string) => void;
}

export function DeckView({ deck, onBack, onEdit, onDelete }: DeckViewProps) {
  return (
    <Box className="w-full max-w-4xl mx-auto space-y-6">
      <Flex className="justify-between items-center">
        <Box className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Box>
            <Text weight="bold" size="4">{deck.title}</Text>
            <Text size="2" color="sage">{deck.translatedTitle}</Text>
          </Box>
        </Box>
        <Flex className="gap-2">
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit(deck)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('¿Estás seguro de que quieres eliminar este deck?')) {
                onDelete(deck.id);
              }
            }}
            className="text-red-9 hover:text-red-10 hover:bg-red-2"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </Flex>
      </Flex>

      <Card>
        <CardHeader>
          <Flex className="justify-between items-center w-full">
            <CardTitle>Información</CardTitle>
            <Badge color="lime" variant="surface">{deck.language}</Badge>
          </Flex>
        </CardHeader>
        <CardContent className="pt-0">
          <Flex direction="column" gap="4">
            <Box>
              <Text weight="medium" color="sage" size="2">Título original</Text>
              <Text>{deck.title}</Text>
            </Box>
            <Separator />
            <Box>
              <Text weight="medium" color="sage" size="2">Título traducido</Text>
              <Text>{deck.translatedTitle}</Text>
            </Box>
            <Separator />
            <Box>
              <Text weight="medium" color="sage" size="2">Idioma</Text>
              <Text>{deck.language}</Text>
            </Box>
            <Separator />
            <Box>
              <Text weight="medium" color="sage" size="2">Palabras</Text>
              <Text>{deck.words.length} palabra{deck.words.length !== 1 ? 's' : ''}</Text>
            </Box>
            <Separator />
            <Box>
              <Text weight="medium" color="sage" size="2">Creado</Text>
              <Text>{deck.createdAt.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            </Box>
          </Flex>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Palabras ({deck.words.length})</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {deck.words.length === 0 ? (
            <Box className="text-center py-8 text-sage-9">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <Text>Este deck no tiene palabras aún</Text>
            </Box>
          ) : (
            <Flex direction="column" gap="3">
              {deck.words.map((word, index) => (
                <Box
                  key={word.id}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-lg border transition-colors',
                    index % 2 === 0 ? 'bg-sage-1 border-sage-3' : 'bg-white border-sage-3'
                  )}
                >
                  <Box className="flex items-center gap-4 flex-1 min-w-0">
                    <Box
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-lime-2 text-lime-11 font-bold text-lg shrink-0"
                    >
                      {index + 1}
                    </Box>
                    <Box className="flex-1 min-w-0">
                      <Flex className="items-baseline gap-3 mb-1" wrap>
                        <Text weight="bold" size="3" className="truncate">{word.original}</Text>
                        {word.reading && (
                          <Text color="sage" size="2">({word.reading})</Text>
                        )}
                        <Badge variant="surface" color="sage" size="1">
                          {word.meaning}
                        </Badge>
                      </Flex>
                      {word.examples && word.examples.length > 0 && (
                        <Flex wrap gap="2" className="mt-1">
                          {word.examples.slice(0, 2).map((ex, i) => (
                            <Box
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-sage-2 text-sage-10 text-sm"
                            >
                              <Text size="2">Ej:</Text>
                              <Text size="2" className="truncate max-w-[200px]">{ex}</Text>
                            </Box>
                          ))}
                          {word.examples.length > 2 && (
                            <Badge variant="surface" color="sage" size="1">
                              +{word.examples.length - 2} más
                            </Badge>
                          )}
                        </Flex>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Flex>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}