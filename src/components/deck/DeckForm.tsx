import { useState } from 'react';
import { Box, Text } from '@radix-ui/themes';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { WordSearch } from './WordSearch';
import { SelectedWords } from './SelectedWords';
import { Container } from '../ui/Container';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/Dialog';
import { Word } from '../../types';
import { SHAPES } from '../../shapes';
import { ShapeIcon } from './ShapeIcon';
import { Save, X, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

interface DeckFormProps {
  onSave: (deck: { title: string; translatedTitle: string; language: string; words: Word[]; shape?: string }) => void;
  onCancel: () => void;
  initialData?: { title: string; translatedTitle: string; language: string; words: Word[]; shape?: string };
  submitting?: boolean;
}

export function DeckForm({ onSave, onCancel, initialData, submitting = false }: DeckFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [translatedTitle, setTranslatedTitle] = useState(initialData?.translatedTitle || '');
  const [language, setLanguage] = useState(initialData?.language || 'Japonés');
  const [shape, setShape] = useState(initialData?.shape || SHAPES[0]);
  const [selectedWords, setSelectedWords] = useState<Word[]>(initialData?.words || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const languages = [
    { value: 'Japonés', label: 'Japonés' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'El título es obligatorio';
    if (!translatedTitle.trim()) newErrors.translatedTitle = 'El título traducido es obligatorio';
    if (!language) newErrors.language = 'Selecciona un idioma';
    if (selectedWords.length === 0) newErrors.words = 'Añade al menos una palabra';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ title: title.trim(), translatedTitle: translatedTitle.trim(), language, words: selectedWords, shape });
    }
  };

  const addWord = (word: Word) => {
    setSelectedWords(prev => [...prev, word]);
  };

  const removeWord = (wordId: string) => {
    setSelectedWords(prev => prev.filter(w => w.id !== wordId));
  };

  return (
    <Box className="w-full max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Container>
          <Text as="span" weight="bold" className="block mb-4 text-sage-12">Información del deck</Text>
          <div className="flex flex-row items-start gap-4">
            <Box className="w-56">
              <span className="block h-7 text-sm font-medium text-sage-11 leading-7">Título del deck *</span>
                <Input
                  placeholder="Ej: Verbos básicos"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  aria-invalid={!!errors.title}
                />
                {errors.title && <Text size="2" color="red" className="mt-1">{errors.title}</Text>}
              </Box>

              <Box className="w-56">
                <span className="block h-7 text-sm font-medium text-sage-11 leading-7">Título traducido *</span>
                <Input
                  placeholder="Ej: Basic Verbs"
                  value={translatedTitle}
                  onChange={(e) => setTranslatedTitle(e.target.value)}
                  aria-invalid={!!errors.translatedTitle}
                />
                {errors.translatedTitle && <Text size="2" color="red" className="mt-1">{errors.translatedTitle}</Text>}
              </Box>

              <Box className="w-40">
                <span className="block h-7 text-sm font-medium text-sage-11 leading-7">Idioma *</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-sage-6 bg-white px-3 text-sm text-sage-12 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-9 focus-visible:ring-offset-2"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                {errors.language && <Text size="2" color="red" className="mt-1">{errors.language}</Text>}
              </Box>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 mt-7"
                    aria-label="Elegir ícono"
                  >
                    <ShapeIcon shape={shape} color="#243524" className="h-5 w-5" />
                    Ícono
                    <ChevronDown className="h-4 w-4 text-sage-9" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Elegir ícono del deck</DialogTitle>
                  <Box className="mt-4 grid grid-cols-6 gap-1.5">
                    {SHAPES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setShape(s)}
                        aria-pressed={shape === s}
                        aria-label={s}
                        className={cn(
                          'flex items-center justify-center aspect-square rounded-md border transition-colors',
                          shape === s
                            ? 'border-lime-7 bg-lime-2 ring-2 ring-lime-6'
                            : 'border-sage-5 hover:border-sage-7 hover:bg-sage-2'
                        )}
                      >
                        <ShapeIcon shape={s} color="#243524" className="h-6 w-6" />
                      </button>
                    ))}
                  </Box>
                </DialogContent>
              </Dialog>

              <Button
                type="button"
                variant="outline"
                className="mt-7"
                onClick={onCancel}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                type="submit"
                className="mt-7"
                disabled={submitting || selectedWords.length === 0 || !title.trim() || !translatedTitle.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                {submitting ? 'Guardando...' : 'Guardar deck'}
              </Button>
            </div>
        </Container>

        {errors.words && (
          <Box className="mb-4 p-3 rounded-md bg-red-1 border border-red-5 text-red-11">
            {errors.words}
          </Box>
        )}

        <Container>
          <Text as="span" weight="bold" className="block mb-4 text-sage-12">Palabras</Text>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
            <WordSearch
              selectedWords={selectedWords}
              onAddWord={addWord}
              language={language}
            />
            <SelectedWords
              words={selectedWords}
              onRemoveWord={removeWord}
            />
          </Box>
        </Container>
      </form>
    </Box>
  );
}
