import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Box, Text, Flex } from '@radix-ui/themes';
import { Trash2, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Deck } from '../../types';
import { cn } from '../../components/utils/cn';
import { ShapeIcon } from './ShapeIcon';

interface DeckCardProps {
  deck: Deck;
  onDelete: (id: string) => void;
  onView?: (deck: Deck) => void;
}

export function DeckCard({ deck, onDelete, onView }: DeckCardProps) {
  return (
    <Card
      className={cn(
        'w-[215px] rounded-[16px] p-4 shadow-none',
        onView && 'cursor-pointer'
      )}
      style={{ backgroundColor: deck.bgColor }}
    >
      <Box className="flex flex-col h-full">
        <Text
          weight="bold"
          className="text-[32px] leading-none text-sage-12 truncate"
          onClick={() => onView?.(deck)}
        >
          {deck.title}
        </Text>
        <Text size="2" color="sage" className="text-[20px] leading-tight mt-1 truncate">
          {deck.translatedTitle}
        </Text>

        <Flex className="items-center gap-2 mt-1.5">
          <Box className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-lime-2 text-lime-11">
            {deck.language}
          </Box>
          <Text size="2" color="sage">
            {deck.words.length} palabra{deck.words.length !== 1 ? 's' : ''}
          </Text>
        </Flex>

        {deck.shape && (
          <Box className="flex items-center justify-center my-2">
            <ShapeIcon
              shape={deck.shape}
              color={deck.fgColor || '#000000'}
              className="w-full object-contain"
            />
          </Box>
        )}

        <Flex className="justify-end gap-1 mt-auto pt-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            asChild
            aria-label="Editar palabras"
          >
            <Link to={`/decks/${deck.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-9 hover:text-red-10"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('¿Estás seguro de que quieres eliminar este deck?')) {
                onDelete(deck.id);
              }
            }}
            aria-label="Eliminar deck"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Flex>
      </Box>
    </Card>
  );
}