export interface Deck {
  id: string;
  title: string;
  translatedTitle: string;
  language: string;
  words: Word[];
  shape?: string;
  bgColor?: string;
  fgColor?: string;
  createdAt: Date;
}

export interface Word {
  id: string;
  original: string;
  reading?: string;
  meaning: string;
  examples?: string[];
}